import { Table } from "flowbite-react";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io"

export function MovesHistory() {
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
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="cursor-pointer hover:bg-slate-200">
                            e4
                        </Table.Cell>
                        <Table.Cell className="cursor-pointer hover:bg-slate-200">
                            e5
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}