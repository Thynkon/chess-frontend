import Nav from "../Nav";
import { Tabs } from "flowbite-react";
import Activity from "./Activity";
import Games from "./Games";
import { motion, useScroll, useSpring } from "framer-motion"

export function Profile() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress)

    return (
        <>
            <Nav />
            <Tabs.Group
                aria-label="Tabs with underline"
                style="underline"
                className="flex justify-center"
            >
                <Tabs.Item title="Activity" active={true}>
                    <Activity />
                </Tabs.Item>
                <Tabs.Item
                    title="Games"
                >
                    <Games />
                </Tabs.Item>
            </Tabs.Group>
        </>
    );
}

export default Profile;