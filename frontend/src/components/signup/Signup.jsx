import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:1000/api/v1/register`,
        inputs
      );
      
      if (response.data.message === "User Already Exists") {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        setInputs({
          email: "",
          username: "",
          password: "",
        });
        history("/signup");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      alert("There was an error with the signup process. Please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="container-signup">
        <div className="row">
          <div className="justify-content-center align-items-center">
            <h1 id="heading">Sign Up</h1>
            <form className="d-flex flex-column w-100 p-3" onSubmit={handleSubmit}>
              <input
                className="input-signup"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={handleChange}
                value={inputs.email}
              />
              <input
                className="input-signup"
                type="text"
                name="username"
                placeholder="Enter Your Username"
                onChange={handleChange}
                value={inputs.username}
              />
              <input
                className="input-signup"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={handleChange}
                value={inputs.password}
              />
              <button className="btn-signup p-2" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
