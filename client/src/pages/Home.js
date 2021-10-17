import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { React, useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Header2 from "../components/Header2";
import Quotes from "../components/Quotes";

const Home = () => {
  const [name, setName] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

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
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/home/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="bg-blue-200 h-screen">
      <Header2 />
      <div className="flex flex-col items-center justify-center">
        <Quotes />
      </div>
    </div>
  );
};

export default Home;
