import React, { useState , useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import { BsCalendar } from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import './NoteForm.css';
import useNoteStore from '../store/NoteStore';
import { uid } from "uid";

function NoteForm(props) {

  const {DirectoryList , addNote , updateNote} = useNoteStore(); // get the directory list from the store

  // --------------- for field items input changes ----------------------

  const [note, setnote] = useState({})

  // ----------------------- this function is for reset the field ------------------------

  const reset = ()=>{
    setnote(
      props.defaultNote.id? props.defaultNote : {
        id: new uid(),
        title: '',
        dir: "Main",
        description: "",
        dueDate: new Date().toISOString(),
        completed: false,
        important: 1,
        updateTime: new Date().toISOString()
      }
    )
    console.log(note);
  }
  useEffect(() => reset(), [])

  //------------------------ handeling the input changes ---------------------------


  const handleNoteTitleChange = (event) => {
    setnote({...note , title:event.target.value});
  };
  const handleDescriptionChange = (event) => {
    setnote({...note , description:event.target.value});
  };

  const handleDirectoryChange = (event) => {
    setnote({...note , dir:event.target.value});
  };

  const handleDateChange = (date) => {
    setnote({...note , dueDate:date});
  };

  const handleCompletionStatusChange = (event) => {
    if(event.target.value==="true"){
      setnote({...note , completed:true});
    }
    else{
      setnote({...note , completed:false});
    }
  };

  const handleImportanceChange = (event) => {
    if (event.target.value==="1"){
      setnote({...note , important:1});
    }
    else if (event.target.value==="2"){
      setnote({...note , important:2});
    }
    else{
      setnote({...note , important:3});
    }
  };

  ///------------------- this section is for submiting the value -------------------

  const handleSubmit = () => {
    // alert(props.defaultNote)
    // console.log(note);
    props.defaultNote.id ? updateNote(note) : addNote(note);
    props.setshowModal(false);
    props.setdefaultNote({});
    reset();
  };

  const handleClear = () => {
    reset();
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Note Title</Form.Label>
        <Form.Control type="text" placeholder="Note Title" value={note.title} onChange={handleNoteTitleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} value={note.description} onChange={handleDescriptionChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Select Date</Form.Label>
        <div className="date-picker-wrapper">
          <DatePicker
            selected={note.dueDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="MM/DD/YYYY"
            className="custom-date-picker"
          />
          <BsCalendar className="calendar-icon" />
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
        <Form.Label>Completion Status</Form.Label>
        <Form.Select value={note.completed} onChange={handleCompletionStatusChange}>
          <option value="true">Completed</option>
          <option value="false">Uncompleted</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect2">
        <Form.Label>Importance</Form.Label>
        <Form.Select value={note.important} onChange={handleImportanceChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect3">
        <Form.Label>Directory</Form.Label>
        <Form.Select value={note.dir} onChange={handleDirectoryChange}>
          {DirectoryList.map((directory, key) => (
            <option key={key} value={directory}>{directory}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="button-container">
        <Button variant="primary" onClick={handleSubmit} className="submit-btn">Submit</Button>
        <Button variant="secondary" onClick={handleClear} className="clear-btn">Clear</Button>
      </div>
    </Form>
  );
}

export default NoteForm;
