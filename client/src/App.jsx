import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";

import {
  Analysis,
  Board,
  Chat,
  GameMenu,
  Header,
  Login,
  Nav,
} from "./components";

const App = () => {
  return (
    <div className="container">
      <Header />

      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/:userId" element={<GameMenu />} exact />
          <Route
            path="/:userId/:roomId"
            element={
              <div className="display">
                <Board />
                <Analysis />
                <Chat />
              </div>
            }
          />
        </Routes>
      </Router>

      <Nav />
    </div>
  );
};

export default App;
