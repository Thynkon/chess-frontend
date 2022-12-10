import { Nav } from "../components/Nav";
import { Container, Grid } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Modal from "../components/CreateGameModal";

export default function Root() {
    return (
        <>
            <Nav />
            <Container className="mt-4 mx-auto">
                <div className="mb-4">
                    <Modal />
                </div>
                <Grid container spacing={2}>
                    <Grid xs={8}>
                        <p>xs=8</p>
                    </Grid>
                    <Grid xs={4}>
                        <p>xs=4</p>
                    </Grid>
                    <Grid xs={4}>
                        <p>xs=4</p>
                    </Grid>
                    <Grid xs={8}>
                        <p>xs=8</p>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}