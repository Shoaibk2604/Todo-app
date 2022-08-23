import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import {MdDone} from "react-icons/md"
import EmptyList from "./EmptyList";
const AllScreen = (props)=>{
    return(<div>
        {props.data.length > 0 ? (
            props.data.map((item, index) => {
                            return (
                                <div className="tab" key={index}>
                                    <button ><MdDone  onClick={()=>props.fun(item.id,props.data)} className={item.completed?"done":"undone"}/></button>
                                    <h3 className={item.completed?"complete":"incomplete"}>{item.text}</h3>
                                    <button onClick={() => props.dlt(item.id)}>
                                        <RiDeleteBinLine />
                                    </button>
                                </div>
                            );
                            
                        })
                    ):  <EmptyList/>}
    </div>)
}
export default AllScreen;