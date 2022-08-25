import React, { useEffect, useState } from "react";
import { toast, Flip } from "react-toastify";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import ActiveScreen from "./ActiveScreen";
import CompletedScreen from "./CompletedScreen";
import AllScreen from "./AllScreen";

const Main = (props) => {
  // props
  const{mode,darkMode} = props
// state
  const [inputData, onChangedata] = useState("");
  const [items, addItems] = useState([]);
  const [filter, updatefilter] = useState([]);
  const [division, updatediv] = useState("all");

  // Add Items
  const addToList = () => {
    if (!inputData) {
      toast.error("Please Add Something!", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
    } else {
      let id = 1;
      if (items.length > 0) {
        id = items[0].id + 1;
      }
      let todo = { id: id, text: inputData, completed: false };
      let newTodos = [todo, ...items];
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

  useEffect(() => {
    completedItems(division);
  }, [inputData]);

  // onclick event complete
  const changeClass = (idx, item) => {
    let updatedTodos = items.map((todo) => {
      if (todo.id === idx) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    updatefilter(updatedTodos);
    savedata(item);
    completedItems(division);
  };

  // completed div click

  const completedItems = (name) => {
    if (name === "completed") {
      const completedFil = items.filter((item) => {
        if (item.completed == true) {
          return item;
        }
      });
      updatefilter(completedFil);
      updatediv(name);
    } else if (name === "active") {
      const activeFil = items.filter((active) => {
        if (active.completed == false) {
          return active;
        }
      });
      updatefilter(activeFil);
      updatediv(name);
    } else {
      updatediv(name);
    }
  };

  // Delete item

  const deleteItem = (id) => {
    const deleteItemIndex = items.filter((elem, ind) => {
      return elem.id !== id;
    });
    addItems(deleteItemIndex);
    completedItems(division);
    localStorage.setItem("data", JSON.stringify(deleteItemIndex));
  };

  // Clear completed event

  const clearAll = (items) => {
    const dltcomplted = items.filter((item, index) => {
      return item.completed == false;
    });
    addItems(dltcomplted);
    savedata(dltcomplted);
  };

  // DARK MODE
  const modeChange = () => {
    switch (true) {
      case mode == true:
        darkMode(false);
        break;
      case mode == false:
        darkMode(true);
      default:
        break;
    }
  };

  // Code
  return (
    <div className="container">
      <div className="main-center">
        <section className="head-section">
          <div className="head-ing">
            <h1>TODO</h1>
            <h1 onClick={() => modeChange()}>
              {mode ? (
                <BsFillSunFill className={mode ? "true" : ""} />
              ) : (
                <BsMoonFill className={mode ? "" : "false"} />
              )}
            </h1>
          </div>
          <div className={mode ? "bg-list" : "d-bg-list"}>
            <div className="inp-style">
              <input
                className={mode ? "" : "inp"}
                type="text"
                value={inputData}
                onKeyDown={(ev) => handleKey(ev.key)}
                onChange={(e) => onChangedata(e.target.value)}
                placeholder="Create a new todo.."
              />
            </div>
            <div className={mode ? "btn" : "d-btn"}>
              <button onClick={addToList}>+</button>
            </div>
          </div>
        </section>
        <section className={mode ? "main-contain" : "d-main-contain"}>
          {division == "all" && (
            <AllScreen
              data={items}
              modeData={mode}
              fun={changeClass}
              dlt={deleteItem}
            />
          )}
          {division == "active" && (
            <ActiveScreen
              deta={filter}
              modeData={mode}
              fun={changeClass}
              dlt={deleteItem}
            />
          )}
          {division == "completed" && (
            <CompletedScreen
              dota={filter}
              modeData={mode}
              fun={changeClass}
              dlt={deleteItem}
            />
          )}

          <hr />

          <div className="fix-btn">
            <div className="font-bottom">
              {division == "all" && items.length}
              {division == "active" && filter.length}{" "}
              {division == "completed" && filter.length} item left
            </div>
            <div className="list-items">
              <ul>
                <li
                  className={division == "all" ? "active" : ""}
                  onClick={() => completedItems("all")}
                >
                  All
                </li>
                <li
                  className={
                    division == "active" ? "mg-left active" : "mg-left"
                  }
                  onClick={() => completedItems("active")}
                >
                  Active
                </li>
                <li
                  className={
                    division == "completed" ? "mg-left active" : "mg-left"
                  }
                  onClick={() => completedItems("completed")}
                >
                  Completed
                </li>
              </ul>
            </div>
            <div>
              <button
                className={mode ? "clear-btn font-bottom" : "d-clear-btn"}
                onClick={() => clearAll(items)}
              >
                Clear Completed
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Main;
