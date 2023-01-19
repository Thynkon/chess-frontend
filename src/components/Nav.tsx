import * as React from 'react';
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom';
import { Dropdown, Navbar } from 'flowbite-react';

import { useAuthUser } from 'react-auth-kit'
import { useMemo, useRef } from 'react';
import anime from 'animejs';

const pages = ['Games', 'Stats', 'Other players'];

export function Nav() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const signOut = useSignOut();
    const navigate = useNavigate();
    const auth = useAuthUser();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        signOut();
    };

    const dropdownRef = useRef(null);

    function handleOpen() {
        anime({
            targets: '.dropdown',
            height: 'auto',
            duration: 200,
            easing: 'easeInOutQuad'
        });
    }

    function handleClose() {
        anime({
            targets: '.dropdown',
            height: 0,
            duration: 200,
            easing: 'easeInOutQuad'
        });
    }

    return (
        <Navbar
            fluid={true}
            rounded={true}
            className="py-4 shadow-md"
        >
            <Navbar.Brand onClick={() => navigate("/")}>
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white cursor-pointer">
                    ExChess
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2 items-center">
                <Dropdown
                    arrowIcon={true}
                    inline={true}
                    label={"Settings"}
                    className='dropdown'
                >
                    <Dropdown.Header>
                        <span className="block truncate text-sm font-medium">
                            {auth()?.username}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={() => navigate("/profile")}>
                        Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/settings")}>
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                        Log out
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className='h-4'>
                <Navbar.Link
                    href="/games"
                    active={true}
                    className="hover:bg-blue-700 hover:text-white px-6 py-2 rounded-md transition duration-150 ease-in"
                >
                    Games
                </Navbar.Link>
                <Navbar.Link href="/other_players"
                    className="hover:bg-blue-700 hover:text-white px-6 py-2 rounded-md transition duration-150 ease-in"
                >
                    Other players
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Nav;