import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import { BsCalendar } from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import './NoteForm.css';

function NoteForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [completionStatus, setCompletionStatus] = useState('');
  const [importance, setImportance] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCompletionStatusChange = (event) => {
    setCompletionStatus(event.target.value);
  };

  const handleImportanceChange = (event) => {
    setImportance(event.target.value);
  };

  const handleSubmit = () => {
    // Your submit logic here
    console.log("Form submitted");
  };

  const handleClear = () => {
    setSelectedDate(null);
    setCompletionStatus('');
    setImportance('');
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Note Title</Form.Label>
        <Form.Control type="Text" placeholder="Note Title" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Select Date</Form.Label>
        <div className="date-picker-wrapper">
          <DatePicker
            selected={selectedDate}
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
        <Form.Select value={completionStatus} onChange={handleCompletionStatusChange}>
          <option value="">Select Completion Status</option>
          <option value="completed">Completed</option>
          <option value="not_completed">UnCompleted</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect2">
        <Form.Label>Importance</Form.Label>
        <Form.Select value={importance} onChange={handleImportanceChange}>
          <option value="">Select Importance</option>
          <option value="important">1</option>
          <option value="unimportant">2</option>
          <option value="unimportant">3</option>
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
