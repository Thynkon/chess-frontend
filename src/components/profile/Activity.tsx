import { Timeline } from "flowbite-react";
import { motion, useScroll, useSpring } from "framer-motion";
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


export function Activity() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress)
    return (
        <>
            <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-2 bg-sky-700 origin-left" />
            <div className="flex justify-center flex-col items-center">
                <div className="w-1/4">
                    <Radar data={data} width={"50%"} />
                </div>
                <Timeline className="">
                    <Timeline.Item>
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
                    <Timeline.Item>
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
                    <Timeline.Item>
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
                    <Timeline.Item>
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
                </Timeline>
            </div>
        </>
    );
}

export default Activity;