import React, { useState } from "react";
import "./style.css";
import Square from "../Square";
import { peiceImageMapping } from "../../assets/data/data";

const Board = () => {
  const [state] = useState([
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
  ]);
  let white = true;
  const rowChar = [8, 7, 6, 5, 4, 3, 2, 1];
  const colChar = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const populatedBoard = state.reduce((acc, row, rowIdx) => {
    white = !white;

    const generatedSquare = row.map((item, idx) => {
      white = !white;

      return (
        <Square
          available={item ? true : false}
          peice={peiceImageMapping[item]}
          position={colChar[idx] + rowChar[rowIdx]}
          tileColor={white ? "#f6eee0" : "#a45c40"}
          key={rowIdx + idx}
        />
      );
    });
    return [...acc, generatedSquare];
  }, []);

  return <div className="board">{populatedBoard}</div>;
};

export default Board;
