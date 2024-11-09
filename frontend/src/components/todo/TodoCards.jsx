import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
import PropTypes from "prop-types";

const TodoCards = ({
  title = "",
  body = "",
  id,
  delid = () => {},
  display = () => {},
  updateId,
  toBeUpdate = () => {},
}) => {
  // Truncate body text if it exceeds 77 characters
  const truncatedBody = body.length > 77 ? `${body.substring(0, 77)}...` : body;

  return (
    <div className="p-3 todo-card">
      <div>
        <h5>{title}</h5>
        <p className="todo-card-p">{truncatedBody}</p>
      </div>
      <div className="d-flex justify-content-around">
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
          onClick={() => {
            display("block");
            toBeUpdate(updateId); // Ensure that the correct ID is passed for updating
          }}
        >
          <GrDocumentUpdate className="card-icons" /> Update
        </div>
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
          onClick={() => delid(id)} // Trigger delete with the task's ID
        >
          <AiFillDelete className="card-icons del" /> Delete
        </div>
      </div>
    </div>
  );
};

// PropTypes to validate the props
TodoCards.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  delid: PropTypes.func.isRequired,
  display: PropTypes.func.isRequired,
  updateId: PropTypes.number.isRequired,
  toBeUpdate: PropTypes.func.isRequired,
};

export default TodoCards;
