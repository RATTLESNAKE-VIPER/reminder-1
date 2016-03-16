import "../css/lib/bootstrap.min.css";
import "./lib/bootstrap/bootstrap.min.js";

import "../css/style.css";

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from "./app";
import NF from "./notFound";
import SignUp from "./signup";
import SignIn from "./signin";
import Dashboard from "./dashboard";
import Activation from "./activation";

render((
	<Router history={browserHistory}>
    <Route path="/" component={App}>
    	<Route path="/activation" component={Activation} />
    	<Route path="/signin" component={SignIn} />
    	<Route path="/signup" component={SignUp} />
    	<Route path="/dashboard" component={Dashboard} />
    </Route>
  </Router>
), document.getElementById("app"))

