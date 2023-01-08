import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io"

export function MovesHistory({ movesHistory }: any) {
        let movesTable: any = [];
        useEffect(() => {
                movesTable = [];
                console.log("Received moves ==> ");
                console.log(movesHistory)
                for(let i = 0; i < movesHistory.player.length; i++) {
                        console.log("PLAYER LENGTH " + i + " <==");
                        movesTable.push((
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="cursor-pointer hover:bg-slate-200">
                                                {movesHistory.player[i]}
                                        </Table.Cell>
                                        <Table.Cell className="cursor-pointer hover:bg-slate-200">
                                                {movesHistory.uci[i]}
                                        </Table.Cell>
                                </Table.Row>
                        ))
                        console.log("showing moves");
                        console.log(movesTable);
                }
        }, [movesHistory]);
                        // {movesHistory.player.map((move: string) => (
                        //     <Table.Cell className="cursor-pointer hover:bg-slate-200">
                        //         {move}
                        //     </Table.Cell>
                        // ))}
    return (

        <div>
            <Table className="w-80">
                <Table.Head>
                    <Table.HeadCell className="cursor-pointer">
                        <IoIosSkipBackward />
                    </Table.HeadCell>
                    <Table.HeadCell className="cursor-pointer">
                        <IoIosSkipForward />
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                        {movesTable.map((move: any) => (
                                <p>asdf</p>
                        ))}
                </Table.Body>
            </Table>
        </div>
    );
}
