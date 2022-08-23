import React, { useEffect, useState } from "react";
import { toast, Flip} from 'react-toastify';
import ActiveScreen from "./ActiveScreen";
import CompletedScreen from "./CompletedScreen";
import AllScreen from "./AllScreen";

const Main = (props) => {
    const [inputData, onChangedata] = useState("");
    const [items, addItems] = useState([]);
    const [activeData, updateActive] = useState([]);
    const [completedData, updateComplete] = useState([]);
    const [division, updatediv] = useState("all");

    // Add Items
    const addToList = () => {
        if (!inputData) {
            toast.error('Please Add Something!',{
                    position: "top-center",
                    autoClose: 800,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition: Flip
                    });
        
        } else {
            let id = 1;
            if(items.length > 0) {
              id = items[0].id + 1
            }
            let todo = {id: id , text: inputData, completed: false}
            let newTodos = [todo, ...items]
            addItems(newTodos);
            savedata(newTodos);
            onChangedata("");
        }
    };
    // enter key handle
    const handleKey = (e) => {
        if (e === "Enter") {
            addToList();
        }
    };

    //   local storage set (save) data
    const itemData = [];
    const savedata = (data) => {
        itemData.push(...data);
        localStorage.setItem("data", JSON.stringify(itemData));
    };

    //  local storage get (upload) data
    const getData = () => {
        const get = localStorage.getItem("data");
        if (get != null || get != undefined) {
            const gotData = JSON.parse(get);
            addItems([...gotData]);
        }
    };

    //  useEffect hook

    useEffect(() => {
        getData();  
    }, []);

    // onclick event complete
    const changeClass = (idx,item)=>{
        let updatedTodos = items.map((todo) => {
            if(todo.id === idx) {
              todo.completed = !todo.completed
            }
            return todo
          })
          addItems(updatedTodos)
          savedata(item)
          completedItems(division)
    }

    // completed div click

    const completedItems = (name)=>{
        if(name==="completed"){
            const completedFil = items.filter((item)=>{
                if(item.completed == true){
                    return item;
                }
            })
            updateComplete(completedFil)
            updatediv(name)
        }
        else if(name==="active"){
            const activeFil = items.filter((active)=>{
                if(active.completed == false){
                    return active;
                }
            })
            updateActive(activeFil);
            updatediv(name)
        }
        else{
            updatediv(name)

        }

    }

     

    // Delete item

    const deleteItem = (id) => {
        const deleteItemIndex = items.filter((elem, ind) => {
            return ind !== id;
        });
        localStorage.setItem("data", JSON.stringify(deleteItemIndex));
        addItems(deleteItemIndex);
    };

    // Clear completed event

    const clearAll = () => {
        localStorage.removeItem("data");
        addItems([]);
    };

    // Code
    return (
        <div className="container">
            <div className="main-center">
                <section className="head-section">
                    <div className="head-ing">
                        <h1>TODO</h1>
                    </div>
                    <div className="bg-list">
                        <div className="inp-style">
                            <input
                                className="inp"
                                type="text"
                                value={inputData}
                                onKeyDown={(ev) => handleKey(ev.key)}
                                onChange={(e) => onChangedata(e.target.value)}
                                placeholder="Create a new todo.."
                            />
                        </div>
                        <div className="btn">
                            <button onClick={addToList} >+</button>
                        </div>
                    </div>
                </section>
                <section className="main-contain">
                    { division == "active" &&  <ActiveScreen deta ={activeData} fun={changeClass} dlt={deleteItem}/> }
                    {division == "completed" &&  <CompletedScreen dota = {completedData} fun= {changeClass} dlt={deleteItem} />}
                    {division == "all" && <AllScreen data = {items} fun= {changeClass} dlt={deleteItem} />}
                    
                    <hr />
                
                    <div className="fix-btn">
                        <div className="font-bottom">{division=="all" && items.length}{division=="active" && activeData.length} {division=="completed" && completedData.length} item left</div>
                        <div className="list-items">
                            <ul>
                                <li className={division=="all"?"active":""} onClick={()=> completedItems('all')}>All</li>
                                <li className={division=="active"?"mg-left active":"mg-left"} onClick={()=> completedItems('active')}>Active</li>
                                <li className={division=="completed"?"mg-left active":"mg-left"} onClick={()=> completedItems('completed')}>Completed</li>
                            </ul>
                        </div>
                        <div>
                            <button className="clear-btn font-bottom" onClick={clearAll}>
                                Clear List
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
export default Main;