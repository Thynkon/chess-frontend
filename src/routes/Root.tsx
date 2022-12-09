import { Nav } from "../components/Nav";
import { Container } from "@mui/material";

export default function Root() {
    return (
        <>
            <Nav />
            <Container maxWidth="sm">
                <div id="main"></div>
            </Container>
        </>
    );
}