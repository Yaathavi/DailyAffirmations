import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { React, useState, useContext } from "react";
import Header from "./Header";
import Header2 from "./Header2";

const LoginComponent = () => {
  let history = useHistory();
  const { setIsAuthenticated } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (email == "" || password == "") {
      console.log("Missing Credentials");
      valid = false;
    } else if (!validEmail(email)) {
      console.log("Invalid Email");
      valid = false;
    }

    if (valid) {
      try {
        const body = { email, password };

        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const parseResponse = await response.json();
        console.log(parseResponse);

        if (parseResponse.token) {
          localStorage.setItem("token", parseResponse.token);
          setIsAuthenticated(true);
          history.push("/home");
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        class="w-full max-w-lg bg-blue-400 px-20 py-12 shadow-2xl"
      >
        <p className="text-center text-2xl font-bold mb-12"> Welcome Back </p>
        <div class="flex flex-wrap -mx-3 mb-4">
          <label
            class="block uppercase tracking-wide  text-xs font-bold mb-2"
            for="grid-last-name"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            class="appearance-none block w-full  text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="flex flex-wrap -mx-3 mb-4">
          <label
            class="block uppercase tracking-wide text-xs font-bold mb-2"
            for="grid-password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            class="appearance-none block w-full  text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="flex items-center justify-center">
          <button class="bg-blue-1000 hover:bg-gray-700 text-white font-bold py-2 px-4 w-full  rounded">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginComponent;
