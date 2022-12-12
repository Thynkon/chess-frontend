import React, { useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { PlayAgainstComputer } from './games/PlayAgainstComputer';
import { PlayAgainstFriend } from './games/PlayAgainstFriend';

const items = [
    <PlayAgainstComputer />,
    <PlayAgainstFriend />
];

export const Carousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const controls = useAnimation();

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
    };

    const handlePrevious = () => {
        setCurrentIndex((currentIndex - 1 + items.length) % items.length);
    };

    return (
        <div>
            <motion.div
                animate={controls}
                initial={{ x: 0 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="flex justify-center max-w-4xl mx-auto"
                transition={{
                    duration: 5,
                    delay: 5,
                    ease: [0.5, 0.71, 1, 1.5],
                    type: "tween",
                    times: [0, 0.5, 1],
                }}
            >
                <div className="flex items-center space-x-4 bg-white rounded-xl">
                    <i className="las la-angle-left text-4xl" onClick={handlePrevious}></i>
                    {items[currentIndex]}
                    <i className="las la-angle-right text-4xl" onClick={handleNext}></i>
                </div>
            </motion.div>
        </div >
    );
};