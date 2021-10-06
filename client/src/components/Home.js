import React, { Fragment, useState, useEffect } from "react";

const Home = ({ setAuth }) => {
  const [name, setName] = useState("");
  console.log("token", localStorage.token);
  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/home/", {
        method: "POST",
        headers: { token: localStorage.token },
      });
      const parseResponse = await response.json();
      setName(parseResponse.user_name);
    } catch (err) {
      console.log(err.mesage);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };
  useEffect(() => {
    getName();
  });
  return (
    <Fragment>
      <h1>Home</h1>
      <p> {name} </p>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        {" "}
        Log out{" "}
      </button>
    </Fragment>
  );
};

export default Home;
