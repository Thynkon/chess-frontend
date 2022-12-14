import { Card, Table, Timeline } from "flowbite-react";
import { GiTrophyCup } from "react-icons/gi";
import Game from "../games/Game";
import { parseFen } from "chessops/fen";
import { Chess } from "chessops";
import { Config } from 'chessground/config';
import Chessground from "@react-chess/chessground";
import { Key } from "chessground/types";

import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io"

// these styles must be imported somewhere
import "../../assets/base.css";
import "../../assets/brown.css";
import "../../assets/piece_set/alpha.css";
import { MovesHistory } from "../games/MovesHistory";


function GameCard() {
    return (
        <div className="max-w-sm cursor-pointer hover:shadow-md">
            <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Win
                </h5>
                <p className="font-small text-gray-700 dark:text-gray-400">
                    2 days ago
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Stockfish level 2
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    50 moves
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    10 minutes
                </p>
            </Card>
        </div>
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
            // showGhost: true,
        }
    }
    return (
        <div className="flex justify-center">
            <div className="flex flex-col space-y-4 mr-4 overflow-scroll max-h-screen">
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
            </div>
            <div className="flex justify-center grow">
                <Chessground width={800} height={800} config={config} />
            </div>
            <div className="flex justify-center">
                <MovesHistory />
            </div>
        </div>
    );
}

export default Games;