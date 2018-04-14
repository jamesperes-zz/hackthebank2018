import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import Home from "./pages/home";

import store from "./store";
import cookie from "react-cookies";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
