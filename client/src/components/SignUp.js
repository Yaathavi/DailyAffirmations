import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { React, useState, useContext } from "react";

const SignUp = ({ setAuth }) => {
  let history = useHistory();
  const { setIsAuthenticated } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseResponse = await response.json();
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
  };
  return (
    <>
      <form
        onSubmit={onSubmit}
        class="w-full max-w-lg bg-blue-400 p-12 shadow-2xl"
      >
        <p className="text-center text-2xl font-bold mb-12">
          {" "}
          Ready to Flourish?{" "}
        </p>
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide  text-xs font-bold mb-2"
              for="grid-first-name"
            >
              First Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              class="appearance-none block w-full  text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
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
        </div>
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full px-3">
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
        </div>
        <div class="flex items-center justify-center">
          <button class="bg-blue-1000 hover:bg-gray-700 text-white font-bold py-2 px-4 w-full  rounded">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
