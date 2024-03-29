import { Nav } from "../Nav";
import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { Config } from 'chessground/config';
import Chessground from "@react-chess/chessground";

// these styles must be imported somewhere
import "../../assets/base.css";
import "../../assets/brown.css";
import "../../assets/piece_set/alpha.css";
import { MovesHistory } from "./MovesHistory";
import { useLocation, useNavigate } from "react-router-dom";
import { Channel, Socket } from "phoenix";
import { Button, Modal } from "flowbite-react";
import Loading from "./Loading";
import anime from "animejs";

type HistoryMoves = {
    uci: string[],
    player: string[]
}

export default function Game() {
    // Fetch arguments from request (passed to router)
    const { state } = useLocation();
    const { game_id, user_id, duration } = state;

    const [socket, setSocket] = useState<Socket | null>(null);
    const [channel, setChannel] = useState<Channel | null>(null);

    const [legalMoves, setLegalMoves] = useState(new Map());

    const [fen, setFen] = useState("");
    const [orientation, setOrientation] = useState<"white" | "black" | undefined>("white");
    const movesHistoryInitialState = { "player": [], "uci": [] };
    const [movesHistory, setMovesHistory] = useState<HistoryMoves>(movesHistoryInitialState);

    const [gameOver, setGameOver] = useState(false);
    const [gameOverReason, setGameOverReason] = useState("");

    const [gameDuration, setGameDuration] = useState<number>(duration);
    const [remainingTime, setRemainingTime] = useState<number>(gameDuration);
    // Logo loading animation
    const [loading, setLoading] = useState(true);
    // F1 Modal (Chess tutorial)
    const [displayHelp, setDisplayHelp] = useState(false);

    // Timer
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasGameStarted, setHasGameStarted] = useState(false);

    function resetGame() {
        setGameOver(false);
        setIsPlaying(false);
        setGameDuration(duration);
        setMovesHistory(movesHistoryInitialState);
        setLegalMoves(new Map());
    }

    // source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    function useInterval(callback: any, delay: number) {
        const savedCallback = useRef<() => void>();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback
        }, [callback])

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current && savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay)
                return () => clearInterval(id)
            }
        }, [delay])
    }

    useEffect(() => {
        if (socket === null) {
            // Create a new socket object and assign it to the socket state variable
            const newSocket = new Socket('ws://localhost:4000/socket', { params: { token: null } });
            setSocket(newSocket);

            // Connect the socket and join the channel
            newSocket.connect();
            const channel = newSocket.channel('pvc_game:lobby', {});

            channel.join()
                .receive("ok", resp => { console.log("Joined successfully", resp) })
                .receive("error", resp => { console.log("Unable to join", resp) })

            channel.push("init_game", { game_id: game_id });

            channel?.on("init_game", payload => {
                const lm = new Map(Object.entries(payload.legal_moves));
                setLegalMoves(lm);
                setFen(payload.fen);
                setOrientation(payload.orientation);
            });

            channel?.on("uci_move", payload => {
                const lm = new Map(Object.entries(payload.legal_moves));
                setLegalMoves(lm);
                setFen(payload.fen);
            });

            channel?.on("play_game", payload => {
                if (payload.status === "checkmate") {
                    if (payload.winner === orientation) {
                        setGameOver(true);
                        setGameOverReason("Congratulations! You won!");
                    } else {
                        setGameOver(true);
                        setGameOverReason("Checkmate! Game Over.");
                        setIsPlaying(false);
                    }
                } else {
                    const lm = new Map(Object.entries(payload.legal_moves));
                    setLegalMoves(lm);
                    setFen(payload.fen);
                    setMovesHistory(prevState => ({
                        ...prevState,
                        player: [...prevState.player],
                        uci: [...prevState.uci, payload.uciMove],
                    }));
                }
            });
            setChannel(channel);
        }

        // When this component is rendered, the loading animation lasts 1,5 seconds
        // After that time, disable it and show chessboard
        const loadingTimer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "F1") {
                event.preventDefault();
                setIsPlaying(false);
                setDisplayHelp(true);
            }
        }, true);

        var tl = anime.timeline({
            targets: '.game-item',
            delay: function (el, i) { return i * 200 },
            duration: 500, // Can be inherited
            easing: 'easeOutExpo', // Can be inherited
            direction: 'alternate', // Is not inherited
            loop: false // Is not inherited
        });

        tl.add({
            translateY: 25,
            // override the easing parameter
            easing: 'spring',
        });

        // Animate the pieces before the game starts
        if (!hasGameStarted && !loading) {
            anime({
                targets: 'piece',
                scale: [
                    { value: .1, easing: 'easeOutSine', duration: 500 },
                    { value: 1, easing: 'easeInOutQuad', duration: 500 }
                ],
                delay: anime.stagger(200, { grid: [14, 5], from: 'center' })
            });

            // Once the chessboard is loaded, wait 1s after the animation
            // and then ask stockfish what is its next move (if stockfish is playing white)
            setTimeout(() => {
                channel?.push("uci_move", { game_id: game_id });
                setHasGameStarted(true);
            }, 1000);
        }

        return () => {
            clearTimeout(loadingTimer);
        };
    }, [orientation, legalMoves, fen, movesHistory, gameOver, loading, hasGameStarted]);

    useInterval(() => {
        if (isPlaying) {
            if (remainingTime >= 0) {
                setRemainingTime((oldValue) => oldValue - 1);
            } else {
                handleLostByTime();
            }
        }
    }, isPlaying === true ? 1000 : 0);

    const handleRestart = () => {
        // Reset all game states
        resetGame();
        // Reask backend to play again
        channel?.push("init_game", { game_id: game_id });
    };

    const handleLostByTime = () => {
        setGameOverReason("Game over! No more time remaining!");
        setGameOver(true);
    };

    // Chessboard configuration
    // https://github.com/lichess-org/chessground/blob/master/src/state.ts
    const config: Config = {
        fen: fen,
        orientation: orientation,
        coordinates: true,
        movable: {
            free: false,
            showDests: true,
            dests: legalMoves,
            events: {
                after: function (origin, destination, captured_piece) {
                    console.log("Original move: " + origin + ", destination: " + destination + ",captured_piece: " + captured_piece);
                    if (!hasGameStarted) {
                        setHasGameStarted(true);
                    }
                    channel?.push("play_game", { from: origin, to: destination })
                    setMovesHistory(prevState => ({
                        ...prevState,
                        player: [...prevState.player, destination],
                        uci: [...prevState.uci],
                    }));

                    // By default, the timer is disabled.
                    // Only enable it on the first move.
                    if (isPlaying === false) {
                        setIsPlaying(true);
                    }

                    // cleaning FEN, if it is not cleaned, after this method,
                    // ReactJS will still use the old FEN which will cause a rollback
                    // on the chessboard
                    setFen("");
                },
            }
        },
        highlight: {
            lastMove: true,
            check: true
        },
        animation: {
            enabled: true,
            duration: 500, // animation when piece is moved from wrong position
        },
        draggable: {
            enabled: true,
        },
        premovable: {
            enabled: true,
            showDests: true,
        },
    }

    const GameOver = ({ onRestart }: any) => {
        const navigate = useNavigate();

        return (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.0 }}
            >
                <Modal show={true} onClose={() => {
                    resetGame();
                    navigate("/");
                }}>
                    <Modal.Header>{gameOverReason}</Modal.Header>
                    <Modal.Body className="p-0">
                        <img src="/assets/images/game_over.jpg" className="w-full h-full" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleRestart}>Restart</Button>
                        <Button
                            color="gray"
                            onClick={() => {
                                setGameOver(false);
                                navigate("/");
                            }}
                        >
                            Return to the main menu
                        </Button>
                    </Modal.Footer>
                </Modal>
            </motion.div>
        );
    }

    function RenderTime({ remainingTime }: any) {
        const minutes = `0${Math.floor(remainingTime / 60)}`.slice(-2);
        const seconds = `0${remainingTime % 60}`.slice(-2);

        if (remainingTime === 0) {
            return <div className="timer">Too lale...</div>;
        }

        return (
            <>
                <div className="w-24 mx-1 bg-white rounded-lg">
                    <div className="leading-none" x-text="minutes">{minutes}</div>
                    <div className="uppercase text-sm leading-none">Minutes</div>
                </div>
                <div className="w-24 mx-1 bg-white rounded-lg">
                    <div className="leading-none" x-text="seconds">{seconds}</div>
                    <div className="uppercase text-sm leading-none">Seconds</div>
                </div>
            </>
        );
    };

    const CountdownTimer = memo(({ duration }: any) => {
        useEffect(() => {
            anime({
                targets: "#coutndown-timer",
                innerHTML: [0, duration],
                easing: 'linear',
                round: 1
            });

        }, [isPlaying]);

        return (
            <div>
                <div className="text-4xl md:text-6xl text-center flex w-full items-center justify-center text-gray-700 ">
                    <RenderTime id="countdown-timer" remainingTime={remainingTime} />
                </div>
            </div>
        );
    });

    const DisplayHelp = () => {
        useEffect(() => { }, []);

        return (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.0 }}
            >
                <Modal show={true} onClose={() => {
                    setIsPlaying(true);
                    setDisplayHelp(false)
                }}>
                    <Modal.Header>Help</Modal.Header>
                    <Modal.Body className="p-0">
                        <p className="mb-4">
                            Here is a tutorial on how to play chess.
                        </p>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/OCSbzArwB10" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                    </Modal.Body>
                </Modal>
            </motion.div>
        );
    }

    return (
        <>
            {loading
                ?
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full h-full flex justify-center items-center"
                >
                    <Loading />
                </motion.div>
                :
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                >
                    <Nav />
                    {displayHelp && <DisplayHelp />}
                    <div className="flex flex-col md:flex-row md:mt-4 game-items">
                        {gameOver
                            ? <GameOver onRestart={handleRestart} />
                            : <>
                                <div className="flex flex-col md:flex-row w-full md:items-start space-y-8 md:space-y-0 md:gap-56 justify-between game-item">
                                    <CountdownTimer duration={gameDuration} />
                                    <div className="flex items-center justify-center aspect-square grow">
                                        <Chessground contained={true} config={config} />
                                    </div>
                                    <MovesHistory movesHistory={movesHistory} />
                                </div>
                            </>
                        }
                    </div>
                </motion.div>
            }
        </>
    );
}
