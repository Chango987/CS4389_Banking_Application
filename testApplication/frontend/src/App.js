import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/privateRoutes';
import { AuthProvider } from './context/authContext';
import Dashboard from './views/dashboard';
import Register from './views/register';
import Login from './views/login';

function App() {
  return (
    <div>App</div>
  );
}

export default App;
