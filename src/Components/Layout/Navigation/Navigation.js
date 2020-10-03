import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

const navigation = () => {
    return (
        <Fragment>
            <ul className='NavList'>
                <li>
                    <NavLink className='Links' exact to='/' >Home</NavLink>
                </li>
                <li>
                    <NavLink className='Links' to='/about' >About</NavLink>
                </li>
                <li>
                    <NavLink className='Links' to='/login' >Login</NavLink>
                </li>
                <li>
                    <NavLink className='Links' to='/register' >Register</NavLink>
                </li>
            </ul>
        </Fragment>
    )
}

export default navigation
