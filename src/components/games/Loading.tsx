import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loading({ className }: any) {
    const [colors, setColors] = useState([
        '#3f83f8'
    ]);
    const [index, setIndex] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index + 1) % colors.length);
        }, 750);
        return () => clearInterval(interval);
    }, [index]);

    useEffect(() => {
        controls.start({
            stroke: colors[index],
            pathLength: 1,
        });
    }, [index, controls]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="flex justify-center w-full"
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='100%'
                height='100%'
                viewBox="-25 0 100 100"
                preserveAspectRatio="none"
            >
                <motion.path
                    initial={{ pathLength: 0 }}
                    fill='#383633'
                    stroke='red'
                    stroke-linejoin='round'
                    d='M38.956.5c-3.53.418-6.452.902-9.286 2.984C5.534 1.786-.692 18.533.68 29.364 3.493 50.214 31.918 55.785 41.329 41.7c-7.444 7.696-19.276 8.752-28.323 3.084C3.959 39.116-.506 27.392 4.683 17.567 9.873 7.742 18.996 4.535 29.03 6.405c2.43-1.418 5.225-3.22 7.655-3.187l-1.694 4.86 12.752 21.37c-.439 5.654-5.459 6.112-5.459 6.112-.574-1.47-1.634-2.942-4.842-6.036-3.207-3.094-17.465-10.177-15.788-16.207-2.001 6.967 10.311 14.152 14.04 17.663 3.73 3.51 5.426 6.04 5.795 6.756 0 0 9.392-2.504 7.838-8.927L37.4 7.171z'
                    animate={controls}
                    transition={{
                        pathLength: { duration: 1.5 },
                    }}
                />
            </svg>
        </motion.div>
    );
}
