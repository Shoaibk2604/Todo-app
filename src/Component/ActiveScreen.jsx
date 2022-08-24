import React from "react";
import { MdDone } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import EmptyList from "./EmptyList";
const ActiveScreen = (props) => {
  return (
    <div>
      {props.deta.length > 0 ? props.deta.map((item, index) => {
        return(<div className={props.modeData?"tab":"d-tab"} key={index}>
        <button>
          <MdDone
            onClick={() => props.fun(item.id, props.deta)}
            className={item.completed ? "done" : props.modeData?"undone":"d-undone"}
          />
        </button>
        <h3 className={item.completed ? "complete" : props.modeData? "incomplete":"d-black"}>
          {item.text}
        </h3>
      </div>)
        
    }):<EmptyList/>}
    </div>
    );
};
export default ActiveScreen;
