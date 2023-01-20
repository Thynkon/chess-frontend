import { Card } from "flowbite-react";
import { Config } from 'chessground/config';
import Chessground from "@react-chess/chessground";


// these styles must be imported somewhere
import "../../assets/base.css";
import "../../assets/brown.css";
import "../../assets/piece_set/alpha.css";
import { MovesHistory } from "../games/MovesHistory";
import { Variants, motion } from "framer-motion";


function GameCard() {
    const cardVariants: Variants = {
        offscreen: {
            y: 300
        },
        onscreen: {
            y: 0,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }
        }
    };

    return (
        <motion.div
            className="px-6 pb-1 md:pb-3 bg-white text-xs lowercase text-gray-700 cursor-pointer hover:bg-gray-200"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
        >
            <motion.div variants={cardVariants} className="w-auto cursor-pointer hover:shadow-md rounded-lg border-2">
                <div>
                    <img src="/assets/images/chessboard_analysis.png" className="invisible w-0 md:visible md:w-auto" />
                </div>
                <div className="flex flex-col gap-1 text-center md:text-left mt-2 md:text-base">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Win
                    </h5>
                    <p className="font-small md:font-4xl text-gray-700 dark:text-gray-400">
                        2 days ago
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Stockfish level 2
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400 invisible w-0 md:visible md:w-auto h-0 md:h-auto">
                        50 moves
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400 invisible w-0 md:visible md:w-auto h-0 md:h-auto">
                        10 minutes
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function Games() {
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
            showDests: true,
        },
        draggable: {
            enabled: true,
        }
    }
    return (
        <div className="flex flex-col md:flex-row w-full md:items-start gap-4 md:gap-10 justify-between game-item">
            <div className="flex flex-col space-y-1 overflow-scroll basis-1/4 md:basis-1/3 max-h-52 md:max-h-screen">
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
            </div>
            <div className="flex items-center justify-center aspect-square grow md:basis-1/3">
                <Chessground contained={true} config={config} />
            </div>
            <div className="flex justify-center md:basis-1/3">
                <MovesHistory />
            </div>
        </div>
    );
}

export default Games;