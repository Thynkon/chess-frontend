import { Carousel, Flowbite } from "flowbite-react";
import { Nav } from "../components/Nav";
import { motion } from "framer-motion";
import { PlayAgainstComputer } from "../components/games/PlayAgainstComputer";
import { PlayAgainstFriend } from "../components/games/PlayAgainstFriend";
import { IoIosArrowDropleftCircle } from "react-icons/io"

export default function Root() {
    // <Carousel className="w-full" />
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="h-full"
            >
                <Nav />
                <div className='flex justify-center max-w-4xl mx-auto items-center space-x-4'>
                    <Flowbite
                        theme={{
                            theme: {
                                carousel: {
                                    leftControl: 'absolute top-1/2 left-0 flex items-center justify-center focus:outline-none bg-gray-100',
                                    rightControl: 'absolute top-1/2 right-0 flex items-center justify-center focus:outline-none bg-gray-100',
                                }
                            }
                        }}
                    >
                        <Carousel slide={false} className="mt-4 flex justify-center">
                            <PlayAgainstComputer />
                            <PlayAgainstFriend />
                        </Carousel>
                    </Flowbite>
                </div>
            </motion.div>
        </>
    );
}