import React from "react";
import "./Navbar.scss";
import { uid } from "uid";
import Task from "../tasks/Task";
import Calendar from "react-calendar";
import Calender from "../calender/Calender";

const NoteDataArr = [
  {
    id: new uid(),
    title: "This is one",
    dir: "Main",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, ",
    dueDate: new Date().toISOString(),
    completed: false,
    important: true,
    updateTime: new Date().toISOString(),
  },
  {
    id: new uid(),
    title: "This is two",
    dir: "Main",
    description: "Testing purpose",
    dueDate: new Date().toISOString(),
    completed: false,
    important: false,
    updateTime: new Date().toISOString(),
  },
  {
    id: new uid(),
    title: "This is three",
    dir: "Job",
    description: "Testing purpose",
    dueDate: new Date().toISOString(),
    completed: true,
    important: true,
    updateTime: new Date().toISOString(),
  },
  {
    id: new uid(),
    title: "This is four",
    dir: "Study",
    description: "Testing purpose",
    dueDate: new Date().toISOString(),
    completed: false,
    important: true,
    updateTime: new Date().toISOString(),
  },
  {
    id: new uid(),
    title: "This is five",
    dir: "Main",
    description: "Testing purpose",
    dueDate: new Date().toISOString(),
    completed: true,
    important: false,
    updateTime: new Date().toISOString(),
  },
];

const DirectoryList = ["Main"];

function Navbar() {
  return (
    <>
      <div className="sideBarContainer">
        <div className="sidebar">
          <div className="sidebar-brand">
            <div className="d-flex justify-content-center">TODO</div>
            <button className="btn btn-primary new-task-btn">New Task</button>
          </div>
          <div className="sidebar-nav">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active">
                  <i className="fas fa-home"></i> Today's tasks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="fas fa-info-circle"></i> All tasks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="fas fa-cogs"></i> Important tasks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="fas fa-envelope"></i> Completed tasks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="fas fa-envelope"></i> Uncompleted tasks
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
                <i className="fa fa-compass" aria-hidden="true" style={{paddingRight:'2px'}}></i> Directories
                </a>
                <ul className="dropdown-menu">
                  <li>
                    {
                      DirectoryList.map((list , i)=>{
                        return (
                          <a className="dropdown-item" style={{color: 'white'}}>
                            {list}
                          </a>
                        )
                      })
                    }
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content">
        <Task NoteDataArr = {NoteDataArr}></Task>
      </div>
      <div className="right-sidebar">
        <Calender></Calender>
      </div>
    </>
  );
}

export default Navbar;
