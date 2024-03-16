import React, { useEffect, useState } from 'react';
import Home from '../home/Home';
import useNoteStore from '../store/NoteStore';
import useSearchStore from "../store/SearchStore";

function Search() {
  const { NoteDataArr } = useNoteStore();
  const { SearchObj } = useSearchStore();
  const [currentNoteArr, setCurrentNoteArr] = useState([]);

  useEffect(() => {
    // Filtering according to the search field
    let filteredNoteArr = [];

    switch (findTrueProperty()) {
      case 'todayTask':
        console.log(NoteDataArr[0].dueDate);
        filteredNoteArr = NoteDataArr.filter(note => {
          if (typeof note.dueDate === 'string') {
            return note.dueDate === SearchObj.todayTask;
          } else {
            return false;
          }
        });
        break;
      case 'allTask':
        // Show all tasks
        filteredNoteArr = NoteDataArr;
        break;
      case 'important':
        filteredNoteArr = [...NoteDataArr].sort((a, b) => {
          return b.important - a.important; 
        });
        break;
      case 'completed':
        // Show completed tasks
        filteredNoteArr = NoteDataArr.filter(note => note.completed);
        break;
      case 'pending':
        // Show pending tasks
        filteredNoteArr = NoteDataArr.filter(note => !note.completed);
        break;
      case 'directory':
        // Filter tasks by directory
        // alert(SearchObj.directory)
        filteredNoteArr = NoteDataArr.filter(note => note.dir === SearchObj.directory);
        break;
      case 'search':
        // Filter tasks by search query
        const searchTerm = SearchObj.search.toLowerCase();
        filteredNoteArr = NoteDataArr.filter(note =>
          note.title.toLowerCase().includes(searchTerm) ||
          note.description.toLowerCase().includes(searchTerm)
        );
        break;
      default:
        // Handle the case when no property is true
        break;
    }

    setCurrentNoteArr(filteredNoteArr);
  }, [NoteDataArr, SearchObj]);

  const findTrueProperty = () => {
    for (const key in SearchObj) {
      if (SearchObj[key]) {
        return key;
      }
    }
    return null;
  };

  return (
    <div>
      <Home NoteDataArr={currentNoteArr} />
    </div>
  );
}

export default Search;
