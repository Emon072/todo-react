import React from "react";
import "./RenderCard.css";
import "../store/NoteStore";
import useNoteStore from "../store/NoteStore";

function RenderCard({ item, updateNote, deleteNote }) {
  const showEdit = () => {
    updateNote(item);
  };

  const deleteExistingNote = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      deleteNote(item.id);
    }
  };
  const { updateNote: Update } = useNoteStore();
  const toggleCompleted = () => {
    let currItem = { ...item };
    if (currItem.completed) {
      currItem = { ...currItem, completed: false };
      Update(currItem);
    } else {
      currItem = { ...currItem, completed: true };
      Update(currItem);
    }
  };
  const increaseImportance = ()=>{
    const currItem = { ...item  , important : item.important + 1};
    Update(currItem);
  }
  const decreaseImportance = () =>{
    const currItem = { ...item  , important : item.important - 1};
    Update(currItem);
  }

  return (
    <div key={item.id} className="col-md-4 mb-4">
      <div className="directory-style">{item.dir}</div>
      <div
        className="card"
        style={{
          borderBlockColor: "#ebb639",
          backgroundColor: !item.completed ? "#ebb639" : "#141e33",
        }}
      >
        <div className="card-body">
          <p className="card-title">{item.title}</p>
          <p
            className="card-description"
            style={{
              height: "5.0rem",
              maxHeight: "5.0em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: item.completed ? "#A7F3D0" : "purple",
            }}
          >
            {item.description}
          </p>
          <div className="d-flex">
            <i
              class="fa fa-calendar"
              aria-hidden="true"
              style={{ color: item.completed ? "#A7F3D0" : "purple" }}
            >
              {" "}
              {new Date(item.dueDate).toLocaleDateString()}{" "}
            </i>
          </div>
          <hr></hr>
          <button
            className="btn btn-info"
            onClick={toggleCompleted}
            style={{ backgroundColor: item.completed ? "#dffff0" : "#FDE68A" }}
          >
            {" "}
            {item.completed ? "Completed" : "Pending"}{" "}
          </button>
          <div className="float-end">

            {Array.from({length: 3 - item.important }).map((_, index) => (
                <i onClick={increaseImportance}
                  key={index}
                  className={"far fa-star"}
                  style={{ color: item.completed ? "#A7F3D0" : "purple" }}
                ></i>
              ))}
            {Array.from({ length: item.important }).map((_, index) => (
              <i
                onClick={decreaseImportance}
                key={index}
                className={"fas fa-star"}
                style={{ color: item.completed ? "#A7F3D0" : "purple" }}
              ></i>
            ))}
            

            <i
              className="fas fa-trash-alt"
              style={{ color: item.completed ? "#A7F3D0" : "purple" }}
              onClick={deleteExistingNote}
            ></i>
            <i
              className="fas fa-edit"
              style={{ color: item.completed ? "#A7F3D0" : "purple" }}
              onClick={showEdit}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderCard;
