import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Home from './Components/Pages/Home/Home';
import About from './Components/Pages/About';
import ContactState from './Context/Contact/ContactState';
import './App.css';

function App() {
  return (
    <ContactState>
      <Router>
        <Navbar />
        <div className='App'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/about' component={About} />
          </Switch>
        </div>
      </Router>
    </ContactState>
  );
}

export default App;
