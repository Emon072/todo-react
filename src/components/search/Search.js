import React, { useEffect, useState } from 'react';
import Home from '../home/Home';
import useNoteStore from '../store/NoteStore';
import useSearchStore from "../store/SearchStore";
import useFilterStore from '../store/FilterStore';

function Search() {
  const { NoteDataArr } = useNoteStore();
  const { SearchObj } = useSearchStore();
  const [currentNoteArr, setCurrentNoteArr] = useState([]);
  const [filterFinalNote, setfilterFinalNote] = useState([])
  const {FilterObj} = useFilterStore();

  useEffect(() => {
    // Filtering according to the search field
    let filteredNoteArr = [];

    switch (findTrueProperty()) {
      case 'todayTask':
        // console.log(NoteDataArr[0].dueDate);
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
    
    // filterFunction();
    
  }, [NoteDataArr, SearchObj]);


  const findTrueProperty = () => {
    for (const key in SearchObj) {
      if (SearchObj[key]) {
        return key;
      }
    }
    return null;
  };

  //------------------------------ this section is for advance filter -------------------------------------------
  useEffect(() => {
    filterFunction();
  }, [FilterObj , currentNoteArr])

  // --- use the filtering function --------
  function filterFunction(){
    let filteredNoteArr = [];
    switch (true) {
      case FilterObj.NoFilter:
        filteredNoteArr = [...currentNoteArr]
        break;
      case FilterObj.ImportanceASC:
        filteredNoteArr = [...currentNoteArr].sort((a, b) => {
          return b.important - a.important; 
        });
        break;
      case FilterObj.ImportanceDEC:
        filteredNoteArr = [...currentNoteArr].sort((a, b) => {
          return a.important - b.important; 
        });
        break;
      case FilterObj.DateASC:
        filteredNoteArr = [...currentNoteArr].sort((a, b) => {
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);
          return dateA - dateB;
        });
        break;
      case FilterObj.DateDEC:
        filteredNoteArr = [...currentNoteArr].sort((a, b) => {
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);
          return dateB  - dateA;
        });
        break;
      case FilterObj.TitleSort:
        filteredNoteArr = [...currentNoteArr].sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
      default:
        break;
    }
    setfilterFinalNote(filteredNoteArr);
  }
  

  return (
    <div>
      <Home NoteDataArr={filterFinalNote} />
    </div>
  );
}

export default Search;
