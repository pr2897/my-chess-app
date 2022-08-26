import React from "react";
import "./style.css";

const Square = ({ available = false, tileColor, peice, position }) => {
  const style = {
    background: tileColor,
  };
  return (
    <div className="square__box" style={style}>
      {available && <img src={peice} alt={position} />}
    </div>
  );
};

export default Square;
