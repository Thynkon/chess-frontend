import React, { useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { PlayAgainstComputer } from './games/PlayAgainstComputer';
import { PlayAgainstFriend } from './games/PlayAgainstFriend';
import { Carousel } from "flowbite-react";

const items = [
    <PlayAgainstComputer />,
    <PlayAgainstFriend />
];

interface CarouselProps {
    className?: string;
}

export const Games = (props: CarouselProps) => {
    const elements = 2;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0)

    const controls = useAnimationControls();

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x > 100) {
            // Dragged to the right
            handleNext();
        } else if (info.offset.x < -100) {
            // Dragged to the left
            handlePrevious();
        } else {
            // Reset the position
            controls.start({ x: 0, transition: { duration: 0.5 } });
        }
    };

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % items.length);
        controls.start({ x: 0, transition: { duration: 0.5 } });
    };

    const handlePrevious = () => {
        setCurrentIndex((currentIndex - 1 + items.length) % items.length);
        controls.start({ x: 0, transition: { duration: 0.5 } });
    };

    let buttons: any = [];
    for (let i = 0; i < elements; i++) {
        buttons.push(
            <button
                type="button" key={i} data-carousel-slide-to={i}
                className={
                    "w-4 h-4 rounded-full border-2 border-blue-500 " +
                    (currentIndex === i ? "bg-blue-500" : "bg-white hover:scale-125 transition duration-300 ease-in")
                }
                onClick={currentIndex !== i ? handleNext : () => { }}
            />
        );
    }

    return (
        <AnimatePresence initial={false} custom={direction}>
            <div className='flex justify-center max-w-4xl mx-auto items-center space-x-4'>
                <Carousel>
                    items

                </Carousel>
            </div>
        </AnimatePresence >
    );
};