import React from "react";
import { MdDone } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import EmptyList from "./EmptyList";
const ActiveScreen = (props) => {
  return (
    <div>
      {props.deta.length > 0 ? props.deta.map((item, index) => {
        return(<div className="tab" key={index}>
        <button>
          <MdDone
            onClick={() => props.fun(item.id, props.deta)}
            className={item.completed ? "done" : "undone"}
          />
        </button>
        <h3 className={item.completed ? "complete" : "incomplete"}>
          {item.text}
        </h3>
        <button onClick={() => props.dlt(item.id)}>
          <RiDeleteBinLine style={{cursor:"pointer"}}/>
        </button>
      </div>)
        
    }):<EmptyList/>}
    </div>
    );
};
export default ActiveScreen;
