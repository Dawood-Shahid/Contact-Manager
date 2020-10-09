import React, { useContext, useEffect, useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../Context/Auth/authContext';
import './Navigation.css';

const Navigation = () => {
    const authContext = useContext(AuthContext);

    const { logout, isAuthenticated, user } = authContext;

    useEffect(() => {
        // console.log(isAuthenticated)
        // console.log(user)

    }, [isAuthenticated, user]);

    let links = null;

    if (isAuthenticated) {
        links = (
            <ul className='NavList'>
                <li>
                    Hello {user && user.name}
                </li>
                <li className='HoverEffact'>
                    <NavLink className='Links' to='/login' >Log out</NavLink>
                </li>
            </ul>
        );
    }
    else {
        links = (
            <ul className='NavList'>
                <li className='HoverEffact'>
                    <NavLink className='Links' to='/login' >Login</NavLink>
                </li>
                <li className='HoverEffact'>
                    <NavLink className='Links' to='/about' >About</NavLink>
                </li>
            </ul>
        );
    }

    return (
        <Fragment>
            {links}
            {/* <ul className='NavList'>
                {authenticatedUser.isAuthenticated ?
                    <Fragment>
                        <li>
                            Hello {authenticatedUser.user && authenticatedUser.user.name}
                        </li>
                        <li>
                            <NavLink className='Links' to='/login' >Log out</NavLink>
                        </li>
                    </Fragment> :
                    <Fragment>
                        <li>
                            <NavLink className='Links' to='/login' >Login</NavLink>
                        </li>
                        <li>
                            <NavLink className='Links' to='/about' >About</NavLink>
                        </li>
                    </Fragment>
                }
            </ul> */}
        </Fragment>
    );
};

export default Navigation;
