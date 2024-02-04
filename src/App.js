import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Alert from "./components/Alert";
import Footer from './components/Footer';
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ScrollToTopOnPageChange from "./components/ScrollToTopOnPageChange";
import SignUp from "./components/SignUp";
import NoteState from "./context/notes/NoteState";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1100);
  }
  return (
    <>
      <NoteState>
        <Router>
         <ScrollToTopOnPageChange />
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/"
                element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about"
                element={<About showAlert={showAlert}/>} />
              <Route exact path="/login"
                element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup"
                element={<SignUp showAlert={showAlert}/>} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
