import { Route, Routes } from "react-router-dom";
import { RequireAuth } from 'react-auth-kit'
import Login from "../components/Login";
import Register from "../components/Register";
import Root from "./Root";
import Game from "../components/games/Game";
import { LoadingAnimation } from "../components/Loading";
import Profile from "../components/Profile";

const RouteComponent = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/loading" element={<LoadingAnimation />} />
            <Route path={'/'} element={
                <RequireAuth loginPath={'/login'}>
                    <Root />
                </RequireAuth>
            } />
            <Route path={'/play'} element={
                <RequireAuth loginPath={'/login'}>
                    <Game />
                </RequireAuth>
            } />
            <Route path={'/profile'} element={
                <RequireAuth loginPath={'/login'}>
                    <Profile />
                </RequireAuth>
            } />
        </Routes>
    );
};

export default RouteComponent;