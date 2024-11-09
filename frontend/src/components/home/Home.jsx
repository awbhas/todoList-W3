import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToTodoList = () => {
    navigate("/todo");
  };

  return (
    <div className="home d-flex justify-content-center align-items-center text-white">
      <div className="container-1 d-flex justify-content-center align-items-center flex-column text-center">
        <h1 className="display-4 font-weight-bold mb-3 ">
          Organize your <br /> work and life, finally.
        </h1>
        <p className="lead mb-2">
          To-Do List Web App created using
        </p>
        <p className="mb-4">ReactJS | MongoDB | Express.js</p>

        <button
          className="btn btn-primary btn-lg home-btn"
          onClick={goToTodoList}
        >
          Make Todo List
        </button>
      </div>
    </div>
  );
};

export default Home;
