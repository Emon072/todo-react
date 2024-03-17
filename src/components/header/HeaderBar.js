import React, { useState, useEffect } from "react";
import "./HeaderBar.css";
import { FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-bootstrap/ProgressBar";
import useSearchStore from "../store/SearchStore";
import useNoteStore from "../store/NoteStore";

function HeaderBar({ headerText }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const {updateSearchObj, updateSearchLabel} = useSearchStore();
  const [progressCount, setprogressCount] = useState(0);
  const {NoteDataArr} = useNoteStore();

  useEffect(() => {
    let cnt = NoteDataArr.reduce((sum , cur)=>{
      return sum+= cur.completed ? 1 : 0;
    }, 0);
    setprogressCount(cnt);
  
  }, [NoteDataArr])
  

  useEffect(() => {
    // Update current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSearchInputChange = (event) => {
    updateSearchLabel("Search Results : ")
    setSearchQuery(event.target.value);
    // console.log("Search query:", event.target.value);
    let updatedObj = {
      todayTask: null,
      allTask: false,
      important: false,
      completed: false,
      pending: false,
      directory: null,
      search : event.target.value
    }
    if (updatedObj.search===""){
      updatedObj = {...updatedObj , allTask: true , search : null}
    }
    updateSearchObj(updatedObj);
  };


  return (
    <>
      <div className="header-style container-fluid">
        <div className="row">
          <InputGroup className="col md-4">
            <InputGroup.Text
              style={{
                backgroundColor: "#141e33",
                border: "none",
                color: "white",
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <FormControl
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              style={{ color: "white" }} // Change placeholder color to white
            />
          </InputGroup>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <ProgressBar
              animated
              now={progressCount * 100/ NoteDataArr.length}
              variant="warning"
              label={`Completed ${progressCount * 100/ NoteDataArr.length}%`}
              className="w-100 custom-progress-bar" // Apply custom class for additional styles
              style={{
                backgroundColor: "#141e33",
                height: "25px",
                fontWeight: "bold",
              }}
            />
          </div>
          <div className="col md-4 d-flex align-items-center justify-content-center">
            <span style={{ color: "aqua", fontSize: "20px" }}>
              {`${currentTime.toLocaleTimeString()}`}
            </span>
          </div>
        </div>
      </div>
      <div className="header-text-design" style={{paddingTop:'20px' , paddingBottom:'10px'}}>
        {headerText}
      </div>
      <hr></hr>
    </>
  );
}

export default HeaderBar;
