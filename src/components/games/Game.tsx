import { Nav } from "../Nav";
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { Config } from 'chessground/config';
import Chessground from "@react-chess/chessground";
import { Key, Timer } from "chessground/types";

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

type Moves = {
    [key in Key]: Key[]
}

type HistoryMoves = {
    uci: string[],
    player: string[]
}

export default function Game() {
    const { state } = useLocation();
    const { game_id, user_id, duration } = state;
    const [legalMoves, setLegalMoves] = useState(new Map());
    const [fen, setFen] = useState("");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [channel, setChannel] = useState<Channel | null>(null);
    const [orientation, setOrientation] = useState<"white" | "black" | undefined>("white");
    const [movesHistory, setMovesHistory] = useState<HistoryMoves>({ "player": [], "uci": [] });
    const [gameOver, setGameOver] = useState(false);
    const [spentTime, setSpentTime] = useState<number>(0);
    const [dur, setDur] = useState<number>(duration);
    const [loading, setLoading] = useState(true);
    const [displayHelp, setDisplayHelp] = useState(false);

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

            console.log("Setting spent time to => " + dur);
            setSpentTime(dur);
        }
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "F1") {
                event.preventDefault();
                setDisplayHelp(true);
            }
        }, true);

        anime({
            targets: '.wrapper',
            translateY: 25,
            delay: anime.stagger(1000, { from: 'center' }),
        });

        return () => {
            clearTimeout(timer);
        };
    }, [orientation, legalMoves, fen, movesHistory]);

    const handleRestart = () => {
        // Restart game logic here
        setGameOver(false);
    };

    const handleLostByTime = () => {
        console.log("You lost by time!");
        alert("You lost by time!");
        // Restart game logic here
        setGameOver(false);
    };

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
                transition={{ duration: 1.0 }}
            >
                <Modal show={true} onClose={() => navigate("/")}>
                    <Modal.Header>Game over!</Modal.Header>
                    <Modal.Body className="p-0">
                        <img src="/assets/images/game_over.jpg" className="w-full h-full" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleRestart}>Restart</Button>
                        <Button
                            color="gray"
                            onClick={() => navigate("/")}
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

        return `${minutes}:${seconds}`
    }

    function RenderTime({ remainingTime }: any) {
        if (remainingTime === 0) {
            return <div className="timer">Too lale...</div>;
        }

        return (
            <div className="text-4xl">
                {formatSeconds(remainingTime)}
            </div>
        );
    };

    const CountdownTimer = memo(({ duration }: any) => {
        const [isPlaying, setIsPlaying] = useState(true);

        useEffect(() => {
        })

        return (
            <div className='flex justify-center items-center pt-1 p-2 text-center text-gray-700 max-h-40 countdown-timer'>
                <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={duration}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => handleLostByTime()}
                    updateInterval={1}
                    onUpdate={(remainingTime: number) => {
                        //setSpentTime(spentTime - 1);
                    }}
                >
                    {({ remainingTime, color }: any) => (
                        <div className='text-sm'>
                            <RenderTime remainingTime={remainingTime} />
                        </div>
                    )
                    }
                </CountdownCircleTimer>
            </div>
        )
    });

    const DisplayHelp = () => {
        const navigate = useNavigate();
        return (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.0 }}
            >
                <Modal show={true} onClose={() => setDisplayHelp(false)}>
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
                >
                    <Loading className="h-1/4 w-full" />
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
                    <div className="flex mt-4 wrapper">
                        {gameOver
                            ? <GameOver onRestart={handleRestart} />
                            : <>
                                <CountdownTimer duration={dur} />
                                <div className="w-full h-full flex items-center justify-center">
                                    <Chessground width={800} height={800} config={config} />
                                </div>
                                <MovesHistory movesHistory={movesHistory} />
                            </>
                        }
                    </div>
                </motion.div>
            }
        </>
    );
}
