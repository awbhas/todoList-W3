import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/Signup";
import SignIn from "./components/signup/SignIn";
import Todo from "./components/todo/Todo";
import { useDispatch } from "react-redux";
import { authActions } from "./store";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      // You might want to pass the id or other details to the login action
      dispatch(authActions.login(id)); // If your action expects an id or token
    }
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
