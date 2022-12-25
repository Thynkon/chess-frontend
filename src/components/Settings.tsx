import Chessground from "@react-chess/chessground";
import Nav from "./Nav";
import { Button, Checkbox, Label, Select, Sidebar, TextInput } from "flowbite-react";
import { FaChessBoard, FaChessKnight } from "react-icons/fa";
import { Config } from "chessground/config";

export function Settings() {
    const config: Config = {
        viewOnly: true,
        coordinates: true,
    }
    return (
        <>
            <Nav />
            <div className="w-full">
                <div className="mt-4 flex h-fit gap-x-4 justify-between">
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
                    <div className="p-3 shadow-md rounded-md w-64 max-h-24">
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
                    <div>
                        <Chessground width={800} height={800} config={config} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;