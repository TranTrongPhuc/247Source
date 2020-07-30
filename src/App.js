import React from 'react';
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Login from './components/Authen/Login';
import Home from './components/Home/Home';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("isAuthenticated") === 'true'
      ? <Component {...props} /> : <Redirect to='/login' />
  )} />
)

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path='/login' component={Login} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute path='/home' component={Home} />
      </BrowserRouter>
    );
  }
}

export default App;