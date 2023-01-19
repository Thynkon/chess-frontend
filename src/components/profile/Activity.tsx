import { Card, Timeline } from "flowbite-react";
import { Variants, motion, useScroll, useSpring } from "framer-motion";
import { GiTrophyCup } from "react-icons/gi";

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import anime from "animejs";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const data = {
    labels: ['Advanced pawn', 'Defensive move', 'Discovered attack', 'Endgame', 'Fork', 'Middle game'],
    datasets: [
        {
            label: 'Points',
            data: [2, 9, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
    ],
};

const Stat = ({ number, label, id }: { number: number, label: string, id: string }) => {
    useEffect(() => {
        anime({
            targets: "#" + id,
            innerHTML: [0, number],
            easing: 'linear',
            round: 1
        });
    }, [number]);

    return (
        <Card className="w-full md:w-auto">
            <h5 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white number-stats" id={id}>
                {number}
            </h5>
            <p className="font-small text-gray-700 dark:text-gray-400 ">{label}</p>
        </Card>
    )
}


export function Activity() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress)
    const items = Array(10).fill(
        <Timeline.Item className="timeline-item">
            <Timeline.Point icon={GiTrophyCup} />
            <Timeline.Content>
                <Timeline.Time>
                    19 December 2022
                </Timeline.Time>
                <Timeline.Title>
                    Win streak
                </Timeline.Title>
                <Timeline.Body>
                    Today you won 10 consecutive games!
                </Timeline.Body>
            </Timeline.Content>
        </Timeline.Item>
    );
    useEffect(() => {
        var tl = anime.timeline({
            targets: '.form-field',
            delay: 20,
            duration: 1, // Can be inherited
            direction: 'alternate',
        });

        tl.add({
            translateX: 50,
            // override the easing parameter
            easing: 'spring',
        })

    });

    return (
        <>
            <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-2 bg-sky-700 origin-left" />
            <div className="flex justify-center flex-col items-center">
                <div className="w-full md:max-w-sm hover:shadow-md">
                    <div className="flex flex-col md:flex-row justify-between gap-4 text-center w-full">
                        <Stat number={50} label={"Played"} id={"played"} />
                        <Stat number={950} label={"Performance"} id={"performance"} />
                        <Stat number={60} label={"Winrate"} id={"winrate"} />
                    </div>
                </div>
                <div className="w-full h-full md:w-1/4">
                    <Radar data={data} width={"50%"} />
                </div>
                <Timeline className="">
                    {items}
                </Timeline>
            </div>
        </>
    );
}

export default Activity;