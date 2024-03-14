import React from 'react'
import RenderCard from '../items/RenderCard';

function Task(props) {
   const renderRows = () => {
    const rows = [];
    for (let i = 0; i < props.NoteDataArr.length; i += 4) {
        rows.push(
        <div key={i} className="row">
            {props.NoteDataArr.slice(i, i + 4).map((item) => <RenderCard item = {item}></RenderCard>)}
        </div>
        );
    }
    return rows;
    };

  return (
    <div>
        {renderRows()}
    </div>
  )
}

export default Task
