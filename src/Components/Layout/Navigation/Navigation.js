import React, { useContext, useEffect, useState, Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AuthContext from '../../../Context/Auth/authContext';
import ContactContext from '../../../Context/Contact/contactContext';
import './Navigation.css';

const Navigation = () => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const currentURL = useLocation();

    const { logout, isAuthenticated, user } = authContext;
    const { clearContacts } = contactContext;

    useEffect(() => {

    }, [isAuthenticated, user]);

    const onLogout = () => {
        logout();
        clearContacts();
    };

    let links = null;

    if (isAuthenticated) {
        links = (
            <ul className='NavList'>
                <li>
                    Hello <span className='UserSpan'>{user && user.name}</span>
                </li>
                <li className='HoverEffact'>
                    <a className='Links' onClick={onLogout} >
                        <i className="fas fa-sign-out-alt ExitLogo"></i>
                        Log out
                    </a>
                </li>
            </ul>
        );
    }
    else {
        links = (
            <ul className='NavList'>
                <li className='HoverEffact'>
                    <NavLink className='Links' to='/Contact-Manager/login' >Login</NavLink>
                </li>
                <li className='HoverEffact'>
                    <NavLink className='Links' to='/Contact-Manager/about' >About</NavLink>
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
