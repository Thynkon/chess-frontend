import { Nav } from "../Nav";
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
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
import { CountdownCircleTimer } from "react-countdown-circle-timer";
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
    const [movesHistory, setMovesHistory] = useState<HistoryMoves>({ "player": [], "uci": [] });

    const [gameOver, setGameOver] = useState(false);
    const [gameOverReason, setGameOverReason] = useState("");

    const [gameDuration, setGameDuration] = useState<number>(duration);
    // Logo loading animation
    const [loading, setLoading] = useState(true);
    // F1 Modal (Chess tutorial)
    const [displayHelp, setDisplayHelp] = useState(false);

    // Timer
    const [isPlaying, setIsPlaying] = useState(false);

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

            channel?.on("play_game", payload => {
                if (payload.status === "checkmate") {
                    setGameOver(true);
                } else if (payload.status === "won") {
                    setGameOver(true);
                    setGameOverReason("Congratulations! You won!");
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
        const timer = setTimeout(() => {
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

        return () => {
            clearTimeout(timer);
        };
    }, [orientation, legalMoves, fen, movesHistory, gameOver]);

    const handleRestart = () => {
        // Restart game logic here
        setGameOver(false);
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
                    setGameOver(false);
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

    const formatSeconds = (remainingTime: number) => {
        const minutes = `0${Math.floor(remainingTime / 60)}`.slice(-2);
        const seconds = `0${remainingTime % 60}`.slice(-2);

        return (
            <div>
                {minutes} : {seconds}
            </div>
        );
    }

    function RenderTime({ remainingTime }: any) {
        if (remainingTime === 0) {
            return <div className="timer">Too lale...</div>;
        }

        return (
            <span className="text-2xl time">
                {formatSeconds(remainingTime)}
            </span>
        );
    };

    const CountdownTimer = memo(({ duration }: any) => {
        useEffect(() => {
        }, []);

        return (
            <div className='flex justify-center items-center md:justify-start md:items-start text-center text-gray-700 game-item'>
                <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={duration}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => handleLostByTime()}
                    updateInterval={1}
                    onUpdate={(remainingTime: number) => {
                        setGameDuration(remainingTime);
                    }}
                    size={140}
                >
                    {({ remainingTime }: { remainingTime: number }) => (
                        <div className="">
                            <RenderTime remainingTime={remainingTime} />
                        </div>
                    )}
                </CountdownCircleTimer>
            </div >
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
                    <div className="flex flex-col md:flex-row mt-4 game-items">
                        {gameOver
                            ? <GameOver onRestart={handleRestart} />
                            : <>
                                <div className="flex flex-col md:flex-row w-full space-y-4 md:space-x-56 justify-between">
                                    <CountdownTimer duration={gameDuration} />
                                    <div className="flex items-center justify-center aspect-square grow game-item">
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
