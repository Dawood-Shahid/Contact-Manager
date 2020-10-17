import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const myApp = (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    {myApp}
  </React.StrictMode >
  ,
  document.getElementById('root')
);
