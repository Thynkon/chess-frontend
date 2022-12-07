import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <div id="detail">
                    <Outlet />
                </div>
                <h1>React Router Contacts</h1>
                <nav>
                    <ul>
                        <li>
                            <a href={'login/'}>login</a>
                        </li>
                        <li>
                            <a href={`contacts/2`}>Your Friend</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"></div>
        </>
    );
}