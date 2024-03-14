import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { NoteDataArr } from "../NoteDataArr";
import RenderCard from "../items/RenderCard";
import Calender from "../calender/Calender";
import ModalForm from "../noteForm/ModalForm";
import NoteForm from "../noteForm/NoteForm";


function Home() {
  const [showModal, setshowModal] = useState(true);
  const toggleModal = ()=> {
    if (showModal){
      setshowModal(false);
    }
    else{
      setshowModal(true);
    }
  }

  return (
    <div className="container-fluid">

      <ModalForm showModal = {showModal} toggleModal = {toggleModal}>
          <NoteForm></NoteForm>
      </ModalForm>

      <div className="row">
        <div className="col-md-2">
          <Navbar toggleModal = {toggleModal}></Navbar>
        </div>
        <div className="col-md-8">
          <div className="row">
            {NoteDataArr.map((item, i) => {
              return <RenderCard item={item}></RenderCard>;
            })}
          </div>
        </div>
        <div className="col-md-2" style={{ backgroundColor: "#141e33", height: "100vh" }}>
        <div className="right-sidebar" style={{ height: "100%" }}>
          <Calender></Calender>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
