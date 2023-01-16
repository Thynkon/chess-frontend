import Chessground from "@react-chess/chessground";
import Nav from "./Nav";
import { Button, Checkbox, Label, Select, Sidebar, TextInput } from "flowbite-react";
import { FaChessBoard, FaChessKnight } from "react-icons/fa";
import { Config } from "chessground/config";
import { motion } from "framer-motion";
import { useEffect } from "react";
import anime from "animejs";

export function Settings() {
    useEffect(() => {
        var tl = anime.timeline({
            targets: '.settings-item',
            delay: function (el, i) { return i * 200 },
            duration: 500, // Can be inherited
            easing: 'easeOutExpo', // Can be inherited
            direction: 'alternate', // Is not inherited
            loop: false // Is not inherited
        });

        tl.add({
            translateY: 10,
            // override the easing parameter
            easing: 'spring',
        })
    });

    const config: Config = {
        viewOnly: true,
        coordinates: true,
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
                <div className="w-full">
                    <div className="mt-4 flex h-fit gap-x-4 justify-between settings-item">
                        <div className="px-3 h-full shadow-md rounded-md">
                            <div className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer">
                                <FaChessBoard className="h-6 w-6" />
                                <span className="px-3">Chessboard</span>
                            </div>
                            <div className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer">
                                <FaChessKnight className="h-6 w-6" />
                                <span className="px-3">Pieces</span>
                            </div>
                        </div>
                        <div className="p-3 shadow-md rounded-md w-64 max-h-40 settings-item">
                            <form className="flex flex-col gap-4">
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="email2"
                                            value="Piece set"
                                        />
                                    </div>
                                    <Select id="countries" required={true} >
                                        <option>
                                            Alpha
                                        </option>
                                        <option>
                                            Anarcandy
                                        </option>
                                        <option>
                                            Fantasy
                                        </option>
                                    </Select>
                                </div>

                                <Button type="submit">Save</Button>
                            </form>
                        </div>
                        <div className="settings-item">
                            <Chessground width={800} height={800} config={config} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default Settings;