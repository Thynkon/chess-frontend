import { Nav } from "../components/Nav";
import { Container, Grid } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Modal from "../components/CreateGameModal";
import { Carousel } from "../components/Caroussel";
import { motion } from "framer-motion";

export default function Root() {
    return (
        <>
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
            >
                <Nav />
                <Container className="mt-4 mx-auto">
                    <div className="mb-4">
                        <Modal />
                    </div>
                </Container>
                <div className="bg-rose-900">
                    <Carousel />
                </div>
            </motion.div>
        </>
    );
}