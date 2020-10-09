import React from 'react'
import Logo from './Logo/Logo'
import Navigation from './Navigation/Navigation'
import './Navbar.css'

const navbar = () => {
    return (
        <div className='Hader'>
            <Logo />
            <Navigation />
        </div>
    )
}

export default navbar
