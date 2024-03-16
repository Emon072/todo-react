import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calender.css'
import useSearchStore from '../store/SearchStore';

function Calender() {
  const [date, setDate] = useState(new Date());
  const {updateSearchLabel , updateSearchObj} = useSearchStore();

  const selectedDate = (e) => {
    // Create a new Date object from the selected date
    const selectedDate = new Date(e);
  
    // Set the date to the next day
    selectedDate.setDate(selectedDate.getDate());
  
    // Format the selected date as "month/day/year"
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1; // Adding 1 to get the correct month (January is 0-indexed)
    const year = selectedDate.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
  
    // Update the state with the selected date
    setDate(e);
  
    // Update the search object with the formatted date
    let updatedObj = {
      todayTask: formattedDate,
      allTask: false,
      important: false,
      completed: false,
      pending: false,
      directory: null,
      search: null
    };
    updateSearchObj(updatedObj);
  
    // Update the search label accordingly
    updateSearchLabel(`${formattedDate}'s Results: `);
  };
  
  
  return (
    <>
    <h1 className='text-center'>Calendar</h1>
      <div className='calendar-container'>
        <Calendar onChange={selectedDate} value={date} />
      </div>
    </>
  );
}

export default Calender;
