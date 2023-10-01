import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Trivia from "./components/Trivia/Trivia";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/homepage" element={<Trivia />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
