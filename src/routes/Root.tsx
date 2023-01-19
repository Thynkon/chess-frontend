import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Slider from "react-slick";
import { Nav } from "../components/Nav";
import PlayAgainstComputer from "../components/games/PlayAgainstComputer";
import { PlayAgainstFriend } from "../components/games/PlayAgainstFriend";

import { RefObject, useRef } from "react";

export default function Root() {
    const slider: RefObject<Slider> = useRef(null);

    const next = () => {
        slider.current!.slickNext();
    };
    const previous = () => {
        slider.current!.slickPrev();
    };
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
            >
                <Nav />
                <div className="w-full flex justify-center items-center">
                    <div className="text-black text-3xl mr-4 hover:cursor-pointer" onClick={previous}>
                        <IoIosArrowBack />
                    </div>
                    <Slider className="pt-6 mb-6 w-64 md:w-96" {...settings} ref={slider}>
                        <PlayAgainstComputer />
                        <PlayAgainstFriend />
                    </Slider>
                    <div className="text-black text-3xl ml-4 hover:cursor-pointer" onClick={next}>
                        <IoIosArrowForward />
                    </div>
                </div>
            </motion.div>
        </>
    );
}