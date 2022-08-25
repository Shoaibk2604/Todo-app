import "./App.css";
import React,{useState} from "react";
import Header from "./Component/header";
import Main from "./Component/main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
const [mode, darkMode] = useState(true);

  return (
    <div className={mode?"App":"black App"}>
      <ToastContainer />
      <Header mode={mode}/>
      <Main mode={mode} darkMode={darkMode}/>
    </div>
  );
}

export default App;
