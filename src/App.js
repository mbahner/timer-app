import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Login from './validate/Login';
import SignUp from './validate/SignUp.js';
import CubeTimer from './timerFeatures/CubeTimer';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        
          

          <Switch>
            <Redirect exact from="/" to="/timer"/>
            <Redirect exact from="/timer" to="/timer/3x3"/>
            <Route path='/timer' component={CubeTimer} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
