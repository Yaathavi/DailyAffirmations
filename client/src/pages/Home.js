import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { React, useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Header2 from "../components/Header2";

const Home = () => {
  const [name, setName] = useState("");
  let history = useHistory();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

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

  if (isAuthenticated) {
    console.log("hi");
  } else {
  }

  return (
    <div>
      <Header2 />
      <h2>Welcome {name}</h2>
    </div>
  );
};

export default Home;
