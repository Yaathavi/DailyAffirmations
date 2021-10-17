import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { React, useState, useContext } from "react";
import Header from "../components/Header";
import Header3 from "../components/Header2";
import LoginComponent from "../components/LoginComponent";
import nah from "../nah.png";
import logo2 from "../logo2.png";

const Login = () => {
  return (
    <div className="flex flex-col overflow-auto bg-scroll  bg-blue-200 h-screen">
      <Header3 />
      <div className=" m-20 flex flex-row justify-around">
        <div className="flex flex-col items-center justify-center">
          <LoginComponent />
        </div>
      </div>
    </div>
  );
};

export default Login;
