import { Route, Routes } from "react-router-dom";
import { RequireAuth } from 'react-auth-kit'
import Login from "../components/Login";
import Root from "./Root";

const RouteComponent = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path={'/'} element={
                <RequireAuth loginPath={'/login'}>
                    <Root />
                </RequireAuth>
            } />
        </Routes>
    );
};

export default RouteComponent;