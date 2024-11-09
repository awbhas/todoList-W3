import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

const Todo = () => {
  const id = sessionStorage.getItem("id");
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [tasks, setTasks] = useState([]);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (id) {
        try {
          const response = await axios.get(`${window.location.origin}/api/v2/getTasks/${id}`);
          setTasks(response.data.list || []);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };
    fetchTasks();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async () => {
    if (!inputs.title || !inputs.body) {
      toast.error("Title or Body can't be empty");
      return;
    }

    if (id) {
      try {
        // Adding the token to the headers if available
        const token = sessionStorage.getItem("token"); // Assuming token is stored in sessionStorage
        const response = await axios.post(
          `${window.location.origin}/api/v2/addTask`,
          { title: inputs.title, body: inputs.body, id: id },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Ensure the token is passed in the headers
            },
          }
        );

        if (response.data && response.data.task) {
          setTasks((prevTasks) => [...prevTasks, response.data.task]);
          toast.success("Your task is added");
          setInputs({ title: "", body: "" });
        } else {
          console.error("Task data missing in the response:", response);
        }
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Failed to add task");
      }
    } else {
      // If no session ID, add the task locally
      setTasks((prevTasks) => [...prevTasks, inputs]);
      setInputs({ title: "", body: "" });
      toast.success("Your task is added locally");
      toast.error("Your task is not saved! Please SignUp");
    }
  };

  const handleDelete = async (taskId) => {
    if (id) {
      try {
        await axios.delete(`${window.location.origin}/api/v2/deleteTask/${taskId}`, {
          data: { id: id },
        });
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        toast.success("Your task is deleted");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    } else {
      toast.error("Please SignUp First");
    }
  };

  const handleUpdateClick = (task) => {
    setIsUpdateVisible(true);
    setTaskToUpdate(task);
  };

  const handleUpdateDisplay = (value) => {
    setIsUpdateVisible(value === "block");
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="container todo-main d-flex justify-content-center my-5 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-lg-50 w-100 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={() => setIsUpdateVisible(false)}
              name="title"
              value={inputs.title}
              onChange={handleInputChange}
            />
            <textarea
              type="text"
              placeholder="BODY"
              name="body"
              className="p-2 todo-inputs"
              value={inputs.body}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-50 w-100 d-flex justify-content-end my-3">
            <button className="btn btn-lg btn-primary px-2 py-1" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {tasks.map((task, index) => (
                <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={task._id || index}>
                  <TodoCards
                    title={task.title}
                    body={task.body}
                    id={task._id}
                    delid={handleDelete}
                    display={handleUpdateDisplay}
                    updateId={index}
                    toBeUpdate={() => handleUpdateClick(task)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isUpdateVisible && taskToUpdate && (
        <div className="todo-update" id="todo-update">
          <div className="container_update">
            <Update display={handleUpdateDisplay} update={taskToUpdate} onTaskUpdate={handleTaskUpdate} />
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
