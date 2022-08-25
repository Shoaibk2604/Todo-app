import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdDarkMode, MdDone } from "react-icons/md";
import EmptyList from "./EmptyList";
const AllScreen = (props) => {
  return (
    <div className="scroll-list">
      {props.data.length > 0 ? (
        props.data.map((item, index) => {
          return (
            <div className={props.modeData?"tab":"d-tab"} key={index}>
              <button>
                <MdDone
                  onClick={() => props.fun(item.id, props.data)}
                  className={item.completed ? "done" :props.modeData?"undone":"d-undone"}
                />
              </button>
              <h3 className={item.completed ? "complete" : props.modeData? "incomplete":"d-black"}>
                {item.text}
              </h3>
              <button onClick={() => props.dlt(item.id)}>
                <RiDeleteBinLine className="dlt" />
              </button>
            </div>
          );
        })
      ) : (
        <EmptyList />
      )}
    </div>
  );
};
export default AllScreen;
