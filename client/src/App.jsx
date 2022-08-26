import React from "react";
import "./index.css";
import "./App.css";

import { Analysis, Board, Chat, Header, Nav } from "./components";

const App = () => {
  return (
    <div className="container">
      <Header />

      <div className="display">
        <Board />
        <Analysis />
        <Chat />
      </div>

      <Nav />
    </div>
  );
};

export default App;
