import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Home from './Components/Pages/Home/Home';
import About from './Components/Pages/About';
import Register from './Components/Pages/Register/Register';
import Login from './Components/Pages/Login/Login';
import Alert from './Components/Layout/Alert/Alerts';
import ContactState from './Context/Contact/ContactState';
import AuthState from './Context/Auth/AuthState';
import AlertState from './Context/Alert/AlertState';
import PrivateRoute from './Components/Routeing/PrivateRoute';
import './App.css';

function App() {
  
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Navbar />
            <Alert />
            <div className='App'>
              <Switch>
                <PrivateRoute path='/' exact component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/about' component={About} />
                <Route path='/register' component={Register} />
              </Switch>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
