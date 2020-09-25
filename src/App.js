import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Components/Layout/Navbar'
import Home from './Components/Pages/Home'
import About from './Components/Pages/About'

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='App'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
