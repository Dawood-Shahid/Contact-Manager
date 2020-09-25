import React from 'react'
import Logo from './Logo/Logo'
import Navigation from './Navigation/Navigation'

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Home from './Components/Pages/Home'
// import About from './Components/Pages/About'

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
