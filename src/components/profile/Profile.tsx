import Nav from "../Nav";
import { Tabs } from "flowbite-react";
import Activity from "./Activity";
import Games from "./Games";

export function Profile() {

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