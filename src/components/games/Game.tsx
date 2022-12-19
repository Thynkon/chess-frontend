import { Nav } from "../Nav";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { parseFen } from "chessops/fen";
import { Chess } from "chessops";
import { Config } from 'chessground/config';
import Chessground from "@react-chess/chessground";
import { Key } from "chessground/types";

// these styles must be imported somewhere
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

type Moves = {
    [key in Key]: Key[]
}

export default function Game() {
    useEffect(() => {

        const setup = parseFen('r1bqkbnr/ppp2Qpp/2np4/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4').unwrap();
        const pos = Chess.fromSetup(setup).unwrap();
        console.assert(pos.isCheckmate());
    });

    const moves = new Map();

    // Update the moves variable with a new object literal that conforms to the Moves type
    moves.set('h2', ['h3', 'h4']);
    moves.set('g2', ['g3', 'g4']);
    moves.set('f2', ['f3', 'f4']);
    moves.set('e2', ['e3', 'e4']);
    moves.set('d2', ['d3', 'd4']);
    moves.set('c2', ['c3', 'c4']);
    moves.set('b2', ['b3', 'b4']);
    moves.set('a2', ['a3', 'a4']);
    moves.set('g1', ['h3', 'f3']);
    moves.set('b1', ['c3', 'a3']);

    const config: Config = {
        coordinates: true,
        events: {
            move: function (origin, destination, captured_piece) {
                // check if move is valid and update fen and available moves
                console.log("Original move: " + origin + ", destination: " + destination + ",captured_piece: " + captured_piece);
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
            dests: moves
        },
        draggable: {
            enabled: true,
            // showGhost: true,
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
                <div className="w-full h-full flex items-center justify-center mt-4">
                    <Chessground width={800} height={800} config={config} />
                </div>
            </motion.div>
        </>
    );
}