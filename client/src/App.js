import React, { Fragment, useState, useEffect } from "react";

import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

import { AuthContext } from "./helpers/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Main from "./pages/Main";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState();

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/is-verified", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await res.json();
      console.log("parseRes", parseRes);

      if (parseRes === true) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
