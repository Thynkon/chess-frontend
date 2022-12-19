import { Nav } from "../components/Nav";
import { Carousel } from "../components/Caroussel";
import { motion } from "framer-motion";

export default function Root() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
            >
                <Nav />
                <div className="w-full mt-10">
                    <Carousel className="w-full" />
                </div>
            </motion.div>
        </>
    );
}