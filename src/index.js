import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import store from "./app/store";

import "antd/dist/antd.css";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import { Loginpage, SignupPage } from "./components";
import "./index.css";

const Index = () => {
  const isAuthenticated = true;
  return (
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <Switch>
            <Route exact path="/login">
              <Loginpage />
            </Route>
            <Route exact path="/signup">
              <SignupPage />
            </Route>
            {isAuthenticated ? (
              <Route exact path="/">
                <App />
              </Route>
            ) : (
              <Redirect to="/login" />
            )}
          </Switch>
        </Provider>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
