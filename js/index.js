import "../css/lib/bootstrap.min.css";
import "./lib/bootstrap/bootstrap.min.js";

import "../css/style.css";
import "../css/media.css";

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from "./app";
import NF from "./notFound";
import SignUp from "./signup";
import SignIn from "./signin";
import Dashboard from "./dashboard";
import Activation from "./activation";
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import persistState, {mergePersistedState} from 'redux-localstorage';

const createPersistentStore = compose(
  persistState(),
  applyMiddleware(thunk)
)(createStore)

const store = createPersistentStore(
	reducer
)

store.subscribe(function(){
  console.log("subscribe",store.getState())
})

//const history = syncHistoryWithStore(browserHistory, store)

render((
	<Provider store={store}>
		<Router history={browserHistory}>
	    <Route path="/" component={App}>
	    	<Route path="/activation" component={Activation} />
	    	<Route path="/signin" component={SignIn} />
	    	<Route path="/signup" component={SignUp} />
	    	<Route path="/dashboard" component={Dashboard} />
	    </Route>
	  </Router>
  </Provider>
), document.getElementById("app"))

