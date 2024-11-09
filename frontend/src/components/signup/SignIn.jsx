import React, { useState } from "react";
import "./signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
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
        `${window.location.origin}/api/v1/signin`,
        inputs
      );

      if (response.data && response.data.user && response.data.user._id) {
        sessionStorage.setItem("id", response.data.user._id);
        dispatch(authActions.login());
        navigate("/todo");
      } else {
        console.error("Unexpected response data format.");
      }
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
    }
  };

  return (
    <div className="signin">
      <div className="container-signin">
        <div className="row">
          <div className="d-lg-flex justify-content-center align-items-center">
          <h1 id="heading">Sign In</h1>
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <form className="d-flex flex-column w-100 p-3" onSubmit={handleSubmit}>
              <input
                className="input-signin"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={inputs.email}
                onChange={handleChange}
                required
              />

              <input
                className="input-signin"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={inputs.password}
                onChange={handleChange}
                required
              />

              <button className="btn-signin" type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
