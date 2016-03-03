import "../css/lib/bootstrap.min.css";
import "./lib/bootstrap/bootstrap.min.js";

import "../css/style.css";

//import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counter from './reducer';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from "./app";
import NF from "./notFound";
import SignUp from "./signup";
import SignIn from "./signin";

render((
	<Router history={browserHistory}>
    <Route path="/" component={App}>
    	<Route path="/signup" component={SignUp} />
    	<Route path="/signin" component={SignIn} />
    </Route>
  </Router>
), document.getElementById("app"))

