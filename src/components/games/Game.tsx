import { Nav } from "../Nav";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Chess } from "chessops";
import { Config } from 'chessground/config';
import Chessground from "@react-chess/chessground";
import { Key } from "chessground/types";

// these styles must be imported somewhere
import "../../assets/base.css";
import "../../assets/brown.css";
import "../../assets/piece_set/alpha.css";
import { MovesHistory } from "./MovesHistory";
import { useLocation, useParams } from "react-router-dom";
import { Channel, Socket } from "phoenix";

type Moves = {
    [key in Key]: Key[]
}

type HistoryMoves = {
    uci: string[],
    player: string[]
}

export default function Game() {
    const { state } = useLocation();
    const { game_id, user_id } = state;
    const [legalMoves, setLegalMoves] = useState(new Map());
    const [fen, setFen] = useState("");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [channel, setChannel] = useState<Channel | null>(null);
    const [orientation, setOrientation] = useState<"white" | "black" | undefined>("white");
    const [movesHistory, setMovesHistory] = useState<HistoryMoves>({ "player": [], "uci": [] });

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
                console.log("Received from init_game ==>");
                console.log(payload);
                const lm = new Map(Object.entries(payload.legal_moves));
                setLegalMoves(lm);
                setOrientation(payload.orientation);
            });

            channel?.on("play_game", payload => {
                setFen(payload.fen);
                const lm = new Map(Object.entries(payload.legal_moves));
                setLegalMoves(lm);
                // should receive uci move and fen
                console.log(payload);
            });
            setChannel(channel);
        }
    }, [orientation, legalMoves]);

    const config: Config = {
        fen: fen,
        orientation: orientation,
        coordinates: true,
        events: {
            move: function (origin, destination, captured_piece) {
                console.log("Original move: " + origin + ", destination: " + destination + ",captured_piece: " + captured_piece);
                // check if move is valid and update fen and available moves
                channel?.push("play_game", { from: origin, to: destination })
                setMovesHistory(prevState => ({
                    ...prevState,
                    player: [...prevState.player, destination],
                    uci: [...prevState.uci],
                }));
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
        movable: {
            free: false,
            showDests: true,
            dests: legalMoves
        },
        draggable: {
            enabled: true,
        }
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
            >

                <Nav />
                <div className="flex">
                    <div className="w-full h-full flex items-center justify-center mt-4">
                        <Chessground width={800} height={800} config={config} />
                    </div>
                    <div className="mt-4">
                        <MovesHistory movesHistory={movesHistory} />
                    </div>
                </div>
            </motion.div>
        </>
    );
}
