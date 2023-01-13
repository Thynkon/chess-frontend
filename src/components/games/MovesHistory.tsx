import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io"

export function MovesHistory({ movesHistory }: any) {
        const movesVariants: Variants = {
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
                <div className="w-80 flex overflow-scroll max-h-72">
                        <div className="w-1/2">
                                <div className="px-6 py-3 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400 cursor-pointer">
                                        <IoIosSkipBackward />
                                </div>
                                {movesHistory?.player.map((move: ReactElement) => (
                                        <motion.div
                                                className="px-6 py-3 bg-white text-xs lowercase text-gray-700 cursor-pointer hover:bg-gray-200"
                                                initial="offscreen"
                                                whileInView="onscreen"
                                                viewport={{ once: true, amount: 0.8 }}
                                        >
                                                <motion.div className="card" variants={movesVariants}>
                                                        {move}
                                                </motion.div>
                                        </motion.div>
                                ))}
                        </div>
                        <div className="flex-grow">
                                <div className="px-6 py-3 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400 cursor-pointer">
                                        <IoIosSkipForward />
                                </div>
                                {movesHistory?.uci.map((move: ReactElement) => (
                                        <motion.div
                                                className="px-6 py-3 bg-white text-xs lowercase text-gray-700 cursor-pointer hover:bg-gray-200"
                                                initial="offscreen"
                                                whileInView="onscreen"
                                                viewport={{ once: true, amount: 0.8 }}
                                        >
                                                <motion.div className="card" variants={movesVariants}>
                                                        {move}
                                                </motion.div>
                                        </motion.div>
                                ))}
                        </div>
                </div >
        );
}
