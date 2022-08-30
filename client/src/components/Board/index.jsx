import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Square from "../Square";
import { peiceImageMapping } from "../../assets/data/data";
import { useEffect } from "react";

const Board = () => {
  const navigate = useNavigate("");
  const [update, setUpdate] = useState(true);
  const [state, setState] = useState(
    JSON.stringify([
      ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
      ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
      ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
    ])
  );

  useEffect(() => {
    if (localStorage.getItem("token") !== "test@email.com") navigate("/");
  }, []);

  useEffect(() => {
    const loadBoard = async () => {
      const resp = await axios.get(
        "http://localhost:3000/v1/chess/cafb63c6-fa0a-4de8-8ff5-bf105c073914"
      );

      setState(JSON.stringify(resp.data.data));
    };

    loadBoard();
  }, [update, state]);

  let white = true;
  const rowChar = [8, 7, 6, 5, 4, 3, 2, 1];
  const colChar = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const populatedBoard = JSON.parse(state).reduce((acc, row, rowIdx) => {
    white = !white;

    const generatedSquare = row.map((item, idx) => {
      white = !white;

      return (
        <Square
          reload={() => {
            console.log("reload called", state);
            setUpdate(!update);
            console.log("reload finished", state);
          }}
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
