import React from "react";
import { MdDone } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import EmptyList from "./EmptyList";

const CompletedScreen = (props) => {
  return (
    <div>
      {props.dota.length > 0 ? props.dota.map((item, index) => {
        return (
          <div className="tab" key={index}>
            <button>
              <MdDone
                onClick={() =>props.fun(item.id, props.dota)}
                className={item.completed ? "done" : "undone"}
              />
            </button>
            <h3 className={item.completed ? "complete" : "incomplete"}>
              {item.text}
            </h3>
            <button onClick={() => props.dlt(index)}>
              <RiDeleteBinLine />
            </button>
          </div>
        );
      }) : <EmptyList/>}
    </div>
  );
};

export default CompletedScreen;