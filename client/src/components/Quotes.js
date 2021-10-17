import React from "react";
import axios from "axios";
import twitterIcon from "../twitter.svg";
import { useState, useEffect } from "react";

const Quotes = () => {
  const [advice, setAdvice] = useState(null);

  useEffect(() => {
    getAdvice();
  }, []);

  const getAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        setAdvice(response.data.slip.advice);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="app">
      <div className="bg-white flex flex-col items-center rounded-md p-8">
        <h1 className="flex items-center text-xl ">{advice}</h1>
        <button
          className="relative rounded-sm flex justify-center items-center cursor-pointer border-solid bg-blue-800 text-white p-2"
          onClick={getAdvice}
        >
          GIVE ME ADVICE!
        </button>
      </div>
    </div>
  );
};

export default Quotes;
