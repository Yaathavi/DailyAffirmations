import React from "react";
import what from "../what.png";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useState, useContext, useEffect } from "react";

export default function Header() {
  let history = useHistory();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [authenticated, setAuth] = useState(null);

  const checkAuthenticated = async () => {
    if (isAuthenticated) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  });

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    history.push("/login");
  };

  return (
    <div>
      <nav class="w-full z-30 top-0 text-blue-1000 py-1 lg:py-6">
        <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-2 lg:py-6">
          <div class="pl-4 flex items-center">
            <a
              class="text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex flex-row items-center"
              href="/"
            >
              <img src={what} className="w-16 mr-4" />
              <p className="text-5xl text-blue-1000"> Flourish </p>
            </a>
          </div>

          <div
            class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 text-black p-4 lg:p-0 z-20"
            id="nav-content"
          >
            <span class="list-reset lg:flex justify-end flex-1 items-center">
              {authenticated ? (
                <button class="mr-3">
                  <a class="inline-block py-2 px-4" href={"/home"}>
                    <p className="text-lg text-blue-1000 border border-solid border-blue-1000 rounded-md px-4 py-2 font-bold">
                      Dashboard
                    </p>
                  </a>
                </button>
              ) : null}

              <button
                class="mr-3"
                onClick={(e) => (authenticated ? logout(e) : signIn(e))}
              >
                <p className="text-lg text-blue-1000 border border-solid border-blue-1000 rounded-md px-4 py-2 font-bold">
                  {" "}
                  {authenticated ? "Sign Out" : "Sign In"}
                </p>
              </button>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
