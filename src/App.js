import React, {useEffect} from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
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
  const currentURL = useLocation();
  console.log(currentURL.pathname);
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Navbar />
          <Alert />
          <div className='App'>
            <Switch>
              <Route path='/Contact-Manager/login' active component={Login} />
              <PrivateRoute path='/Contact-Manager/' exact component={Home} />
              <Route path='/Contact-Manager/about' component={About} />
              <Route path='/Contact-Manager/register' component={Register} />
            </Switch>
          </div>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
