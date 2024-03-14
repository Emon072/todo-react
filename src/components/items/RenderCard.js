import React from "react";
import "./RenderCard.css";

function RenderCard({ item }) {
  return (
      <div key={item.id} className="col-md-3 mb-4">
        <div className="directory-style">{item.dir}</div>
        <div className="card" style={{ borderBlockColor: "#ebb639" }}>
          <div className="card-body">
            <p className="card-title">{item.title}</p>
            <p
              className="card-description"
              style={{
                height: "5.0rem",
                maxHeight: "5.0em",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.description}
            </p>
            <div className="d-flex">
               <i class="fa fa-calendar" aria-hidden="true" style={{color: 'purple'}}> {new Date(item.dueDate).toLocaleDateString()} </i>
            </div> 
            <hr></hr>
            <button className="btn btn-info" style={{ backgroundColor: item.completed ? '#A7F3D0' : '#FDE68A' }}> {item.completed ? 'Completed': 'Uncompleted'} </button>
            <div className="float-end">
                {<i class={item.important ?'fas fa-star' : 'far fa-star'}></i>}
                {<i class={item.important ?'fas fa-star' : 'far fa-star'}></i>}
                {<i class={item.important ?'fas fa-star' : 'far fa-star'}></i>}
                <i class="fas fa-trash-alt"></i>
                <i class="fas fa-edit"></i> 
            </div>
          </div>
        </div>
      </div>
   
  );
}

export default RenderCard;
