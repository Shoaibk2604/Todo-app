import './App.css';
import React from 'react';
import Header from './Component/header';
import Main from './Component/main';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'
// import data from './data/data.json'
function App() {

  return (
    <div className="App">
      <ToastContainer/>
      <Header/>
      <Main/>
    </div>
  );
}

export default App;
