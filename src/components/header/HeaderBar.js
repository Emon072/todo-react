import React, { useState, useEffect } from "react";
import "./HeaderBar.css";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-bootstrap/ProgressBar";
import useSearchStore from "../store/SearchStore";
import useNoteStore from "../store/NoteStore";
import Dropdown from "react-bootstrap/Dropdown";
import useFilterStore from "../store/FilterStore";

function HeaderBar({ headerText }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const { updateSearchObj, updateSearchLabel } = useSearchStore();
  const [progressCount, setprogressCount] = useState(0);
  const { NoteDataArr } = useNoteStore();
  const {updateFilterLabel , updateFilterObj, FilterObj} = useFilterStore();

  useEffect(() => {
    let cnt = NoteDataArr.reduce((sum, cur) => {
      return (sum += cur.completed ? 1 : 0);
    }, 0);
    setprogressCount(cnt);
  }, [NoteDataArr]);

  useEffect(() => {
    // Update current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSearchInputChange = (event) => {
    updateSearchLabel("Search Results : ");
    setSearchQuery(event.target.value);
    // console.log("Search query:", event.target.value);
    let updatedObj = {
      todayTask: null,
      allTask: false,
      important: false,
      completed: false,
      pending: false,
      directory: null,
      search: event.target.value,
    };
    if (updatedObj.search === "") {
      updatedObj = { ...updatedObj, allTask: true, search: null };
    }
    updateSearchObj(updatedObj);
  };

  // ---------------------------------- This section is for filtering purpose --------------------------------
  const handleClick = (e) => {
    const value = e.currentTarget.getAttribute("value");
    let updatedObj = {
      NoFilter: false,
      ImportanceASC: false,
      ImportanceDEC: false,
      DateASC: false,
      DateDEC: false,
      TitleSort: false
    };
    switch (value) {
      case "TitleSort":
        updateFilterLabel("Sorted by Title");
        updatedObj = {...updatedObj , TitleSort : true};
        break;
      case "ImportanceASC":
        updateFilterLabel("Sorted by Importance in ASC order");
        updatedObj = {...updatedObj , ImportanceASC : true};
        break;
      case "ImportanceDEC":
        updateFilterLabel("Sorted by Importance in DEC order");
        updatedObj = {...updatedObj , ImportanceDEC : true};
        break;
      case "DateASC":
        updateFilterLabel("Sorted by Date in ASC order");
        updatedObj = {...updatedObj , DateASC : true};
        break;
      case "DateDEC":
        updateFilterLabel("Sorted by Date in DEC order");
        updatedObj = {...updatedObj , DateDEC : true};
        break;
      default:
        updatedObj = {...updatedObj , NoFilter : true};
        updateFilterLabel("");
        break;
    }
    updateFilterObj(updatedObj);
    // console.log(FilterObj , updatedObj);
  };

  return (
    <>
      <div className="header-style container-fluid">
        <div className="row">
          <InputGroup className="col md-4" style={{ paddingBottom: "5px" }}>
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
              now={(progressCount * 100) / NoteDataArr.length}
              variant="warning"
              label={`Completed ${(progressCount * 100) / NoteDataArr.length}%`}
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
      <div
        className="header-text-design"
        style={{ paddingTop: "20px", paddingBottom: "10px" }}
      >
        {headerText}
      </div>
      <div className="row" style={{ padding: "20px" }}>
        <div className="col-md-10">
          <hr></hr>
        </div>

        <li className="col d-flex justify-content-center " style={{cursor:'pointer'}} >
          <a
            className="nav-link dropdown-toggle filter-link"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className="fa fa-arrow-up"
              aria-hidden="true"
              style={{ paddingRight: "2px" }}
            ></i>{" "}
            Filter
          </a>
          <ul className="dropdown-menu" style={{padding :'10px'}}>
            <li>
              <a
                className="dropdown-item "
                style={{ color: "white", backgroundColor: "#0F172A" }}
                value={"NoFilter"}
                onClick={handleClick}
              >
                No Filter
              </a>
            </li>
            <li>
              <a
                className="dropdown-item "
                style={{ color: "white", backgroundColor: "#0F172A" }}
                value={"ImportanceASC"}
                onClick={handleClick}
              >
                Sorted by Importance (ASC)
              </a>
            </li>
            <li>
              <a
                className="dropdown-item "
                style={{ color: "white", backgroundColor: "#0F172A" }}
                value={"ImportanceDEC"}
                onClick={handleClick}
              >
                
                Sorted by Importance (DEC)
              </a>
            </li>
            <li>
              <a
                className="dropdown-item "
                style={{ color: "white", backgroundColor: "#0F172A" }}
                value={"DateASC"}
                onClick={handleClick}
              >
                Sorted by Date (ASC)
              </a>
            </li>
            <li>
              <a
                className="dropdown-item "
                style={{ color: "white", backgroundColor: "#0F172A" }}
                value={"DateDEC"}
                onClick={handleClick}
              >
                Sorted by Date (DEC)
              </a>
            </li>
            <li>
              <a
                className="dropdown-item "
                style={{ color: "white", backgroundColor: "#0F172A" }}
                value={"TitleSort"}
                onClick={handleClick}
              >
                Sorted by Title
              </a>
            </li>
          </ul>
        </li>



      </div>
    </>
  );
}

export default HeaderBar;
