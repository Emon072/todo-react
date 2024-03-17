import React, { useState } from "react";
import "./Navbar.css";
import useNoteStore from "../store/NoteStore";
import useSearchStore from "../store/SearchStore";
import { Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddDirectoryModal from "../addDirectory/AddDirectoryModal";

function Navbar(props) {
  const { DirectoryList , addNewDir} = useNoteStore();
  const { updateSearchObj, updateSearchLabel } = useSearchStore();
  const [showDirectory, setshowDirectory] = useState(false);
  const [newDirectoryName, setnewDirectoryName] = useState("");

  // ------------ this is for testing purpose -------------------------
  const handleClick = (e) => {
    const value = e.currentTarget.getAttribute("value");
    let updatedObj = {
      todayTask: null,
      allTask: false,
      important: false,
      completed: false,
      pending: false,
      directory: null,
      search: null,
    };
    switch (value) {
      case "today":
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Adding 1 to get the correct month (January is 0-indexed)
        const year = currentDate.getFullYear();

        // Format the date as "month/day/year"
        const formattedDate = `${month}/${day}/${year}`;

        // Update the search object with the formatted date
        updatedObj = { ...updatedObj, todayTask: formattedDate };
        updateSearchLabel("Today's Tasks: ");
        break;
      case "all":
        updatedObj = { ...updatedObj, allTask: true };
        updateSearchLabel("All Tasks : ");
        break;
      case "important":
        updatedObj = { ...updatedObj, important: true };
        updateSearchLabel("Sorted by Importance : ");
        break;
      case "completed":
        updatedObj = { ...updatedObj, completed: true };
        updateSearchLabel("Completed Tasks : ");
        break;
      case "pending":
        updatedObj = { ...updatedObj, pending: true };
        updateSearchLabel("Pending Tasks : ");
        break;
      default:
        updatedObj = { ...updatedObj, directory: value };
        updateSearchLabel(`${value} Directory Result : `);
        break;
    }
    updateSearchObj(updatedObj);
  };

  // ----------------------- this is for adding new directory -------------------------
  const addNewDirectory = () => {
    setshowDirectory(true);
  };
  const handleDirectoryChange = (e) => {
    setnewDirectoryName(e.target.value);
  }
  const handleSubmit = () =>{
    if (newDirectoryName){
      addNewDir(newDirectoryName);
      setnewDirectoryName("");
      setshowDirectory(false);
    }
  }
  const handleClear = () =>{
    setnewDirectoryName("");
  }

  return (
    <>
      <AddDirectoryModal showDirectory={showDirectory} setshowDirectory = {setshowDirectory} setnewDirectoryName= {setnewDirectoryName}>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Directory Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Directory Name"
              value={newDirectoryName}
              onChange={handleDirectoryChange}
            />
          </Form.Group>
          <div className="button-container">
            <Button variant="primary" onClick={handleSubmit} className="submit-btn">Submit</Button>
            <Button variant="secondary" onClick={handleClear} className="clear-btn">Clear</Button>
          </div>
        </Form>
      </AddDirectoryModal>

      <div className="sidebar-brand">
        <div className="d-flex justify-content-center">TODO</div>
        <button
          className="btn btn-primary new-task-btn"
          onClick={props.toggleModal}
        >
          New Task
        </button>
      </div>
      <div className="sidebar-nav">
        <ul className="nav flex-column">
          <li className="nav-item" onClick={handleClick} value="today">
            <a className="nav-link active">
              <i className="fas fa-home"></i> Today's tasks
            </a>
          </li>
          <li className="nav-item" onClick={handleClick} value="all">
            <a className="nav-link">
              <i className="fas fa-info-circle"></i> All tasks
            </a>
          </li>
          <li className="nav-item" onClick={handleClick} value="important">
            <a className="nav-link">
              <i className="fas fa-cogs"></i> Important tasks
            </a>
          </li>
          <li className="nav-item" onClick={handleClick} value="completed">
            <a className="nav-link">
              <i className="fas fa-envelope"></i> Completed tasks
            </a>
          </li>
          <li className="nav-item" onClick={handleClick} value="pending">
            <a className="nav-link">
              <i className="fas fa-envelope"></i> Pending tasks
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className="fa fa-compass"
                aria-hidden="true"
                style={{ paddingRight: "2px" }}
              ></i>{" "}
              Directories
            </a>
            <ul className="dropdown-menu">
              <li>
                {DirectoryList.map((list, i) => {
                  return (
                    <a
                      className="dropdown-item"
                      style={{ color: "white", backgroundColor: "transparent" }}
                      onClick={handleClick}
                      value={list}
                    >
                      {list}
                    </a>
                  );
                })}
                <Button className="plus_design" onClick={addNewDirectory}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "white", padding: "8px" }}
                  />
                </Button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
