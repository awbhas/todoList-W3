// Update.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ display, update, onTaskUpdate }) => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (update) {
      setInputs({
        title: update.title || "",
        body: update.body || "",
      });
    }
  }, [update]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${window.location.origin}/api/v2/updateTask/${update._id}`,
        inputs
      );

      if (response.data && response.data.message) {
        toast.success(response.data.message);
        // Pass the updated task back to the parent component
        if (onTaskUpdate) {
          onTaskUpdate({ ...update, ...inputs });
        }
        display("none"); // Close the update modal
      }
    } catch (error) {
      toast.error("Failed to update the task. Please try again.");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h3>Update Your Task</h3>
      <input
        type="text"
        className="update-inputs my-4 w-100 p-3"
        value={inputs.title}
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />
      <textarea
        className="update-inputs w-100 p-3"
        value={inputs.body}
        name="body"
        placeholder="Body"
        onChange={handleChange}
      />
      <div>
        <button className="btn btn-primary my-4" onClick={handleSubmit}>
          Update
        </button>
        <button
          className="btn btn-danger my-4 mx-3"
          onClick={() => display("none")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
