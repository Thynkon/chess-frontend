import { ReactElement } from "react";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io"

export function MovesHistory({ movesHistory }: any) {
        return (
                <div className="w-80 flex overflow-scroll max-h-screen">
                        <div className="w-1/2">
                                <div className="px-6 py-3 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400 cursor-pointer">
                                        <IoIosSkipBackward />
                                </div>
                                {movesHistory?.player.map((move: ReactElement) => (
                                        <div className="px-6 py-3 bg-white text-xs lowercase text-gray-700 cursor-pointer hover:bg-gray-200" key={move.toString()}>
                                                {move}
                                        </div>
                                ))}
                        </div>
                        <div className="flex-grow">
                                <div className="px-6 py-3 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400 cursor-pointer">
                                        <IoIosSkipForward />
                                </div>
                                {movesHistory?.uci.map((move: ReactElement) => (
                                        <div className="px-6 py-3 bg-white text-xs lowercase text-gray-700 cursor-pointer hover:bg-gray-200" key={move.toString()}>
                                                {move}
                                        </div>
                                ))}
                        </div>
                </div>
        );
}
