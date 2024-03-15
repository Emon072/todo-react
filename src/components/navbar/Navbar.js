import React from "react";
import "./Navbar.css";
import useNoteStore from "../store/NoteStore"



function Navbar(props) {
  const {DirectoryList} = useNoteStore();
  
  return (
        <>
        <div className="sidebar-brand">
            <div className="d-flex justify-content-center">TODO</div>
            <button className="btn btn-primary new-task-btn" onClick={props.toggleModal}>New Task</button>
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
        </>
          
      
  );
}

export default Navbar;
