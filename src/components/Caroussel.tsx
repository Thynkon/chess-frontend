import React, { useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { PlayAgainstComputer } from './games/PlayAgainstComputer';
import { PlayAgainstFriend } from './games/PlayAgainstFriend';

const items = [
    <PlayAgainstComputer />,
    <PlayAgainstFriend />
];

interface CarouselProps {
    className: string;
}

export const Carousel = (props: CarouselProps) => {
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

    return (
        <AnimatePresence initial={false} custom={direction}>
            <div className='flex flex-col justify-center items-center rounded-lg shadow-lg bg-white'>
                <motion.div
                    animate={controls}
                    initial={{ x: 0 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    // initial={{ x: "100%" }}
                    // animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 300, duration: 3 }}
                    // transition={{ duration: 3 }}  // Add the transition duration here
                    className={"flex justify-center max-w-4xl mx-auto items-center space-x-4 " + props.className}
                >
                    <i className="las la-angle-left text-4xl" onClick={handlePrevious}></i>
                    {items[currentIndex]}
                    <i className="las la-angle-right text-4xl" onClick={handleNext}></i>

                </motion.div>
                <div className="w-full flex space-x-3 justify-center items-center p-6">
                    <button type="button" className="w-4 h-4 rounded-full bg-blue-500" aria-current="false" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                    <button type="button" className="w-4 h-4 rounded-full bg-blue-500" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                    <button type="button" className="w-4 h-4 rounded-full bg-blue-500" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                </div>
            </div>
        </AnimatePresence>
    );
};