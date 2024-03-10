import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import '../Home/home.css'
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../store/AuthStore";

const NavbarScreen = () => {

    const IsLogged = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user);

    const dispatch = useDispatch()

    const navigate = useNavigate();


    const logOutUser = () => {
        navigate('/')
        dispatch(logout());
    }


    return (
        <>
            <div className="header">
                <div className="contentWrapper">
                    <Link to="/" className="logo">
                        {/* <img src={logo} alt="logo image" /> */}
                        <h1 style={{ color: 'white' }}>Movies</h1>
                    </Link>
                    <div className="menuItems">
                        {!IsLogged ? (
                            <>
                                <div className="menuItem" onClick={() => navigate('/login')}>
                                    Login
                                </div>
                                <div className="menuItem" onClick={() => navigate('/signup')}>
                                    Sign Up
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="menuItem" onClick={() => navigate('/Profile')} >
                                    Hello {user.payload.username}
                                </div>
                                <div className="menuItem" onClick={() => logOutUser()}>
                                    Log Out
                                </div>
                            </>
                        )

                        }

                        {/* <div className="menuItem">
                            <HiOutlineSearch
                                className="cursor-pointer"
                                onClick={openSearch}
                            />
                        </div> */}
                    </div>
                    {/* <div className="mobileMenuItems">
                        <HiOutlineSearch
                            className="cursor-pointer"
                            onClick={openSearch}
                        />

                    </div> */}

                </div>
                {/* {showSearch && (
                    <div className="searchBar">
                        <div className="contentWrapper">
                            <div className="searchInput">
                                <input
                                    type="text"

                                    // onKeyUp={searchQueryHandler}
                                    placeholder="Search for a movie and TV show..."
                                />
                                <VscChromeClose

                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                )} */}
            </div>
        </>
    )
}

export default NavbarScreen