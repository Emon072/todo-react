import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import RenderCard from "../items/RenderCard";
import Calender from "../calender/Calender";
import ModalForm from "../noteForm/ModalForm";
import NoteForm from "../noteForm/NoteForm";
import useNoteStore from "../store/NoteStore"


function Home() {
  const {NoteDataArr , deleteNote} = useNoteStore();
  const [defaultNote, setdefaultNote] = useState({});

  const [showModal, setshowModal] = useState(false);
  const toggleModal = ()=> {
    if (showModal){
      setshowModal(false);
    }
    else{
      setshowModal(true);
    }
  }
  const updateNote = (note)=>{
    setdefaultNote(note);
    // console.log(note);
    toggleModal();
  }


  return (
    <div className="container-fluid">

      <ModalForm showModal = {showModal} toggleModal = {toggleModal}>
          <NoteForm setshowModal = {setshowModal} defaultNote={defaultNote} setdefaultNote = {setdefaultNote}></NoteForm>
      </ModalForm>

      <div className="row">
        <div className="col-md-2 sidebar">
          <Navbar toggleModal = {toggleModal}></Navbar>
        </div>
        <div className="col-md-8">
          <div className="row">
            {NoteDataArr.map((item, i) => {
              return <RenderCard item={item} key={i} updateNote={updateNote} deleteNote = {deleteNote}></RenderCard>;
            })}
          </div>
        </div>

        <div className="col-md-2" style={{ backgroundColor: "#141e33" }}>
          <div className="right-sidebar" style={{ height: "100%" }}>
            <Calender></Calender>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
