import React, { useState } from "react";
import { isExpired } from "react-jwt";
import axios from "axios";
import "./style.css";
import Square from "../Square";
import { peiceImageMapping } from "../../assets/data/data";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Board = () => {
  const params = useParams();
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
    const token = localStorage.getItem("token");
    if (!token) {
      window.history.pushState(null, null, "../../");
      window.location.reload(true);
    } else {
      const istokenExpired = isExpired(token);
      if (istokenExpired) {
        localStorage.removeItem(token);
        window.history.pushState(null, null, "../../");
        window.location.reload(true);
      }
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const loadBoard = async () => {
      const { roomId } = params;
      const axiosConfig = {
        method: "get",
        url: `${process.env.REACT_APP_GAME_ROOT_API}/${roomId}?type=currentStatus`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios(axiosConfig)
        .then((resp) => {
          setState(JSON.stringify(resp.data.data));
        })
        .catch((err) => {
          alert(err?.response?.data?.message || err.message);
        });
    };

    loadBoard();
  }, [update, state, params]);

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
