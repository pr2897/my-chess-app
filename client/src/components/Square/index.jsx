import axios from "axios";
import React from "react";
import "./style.css";

let myMove = { from: null, to: null };

const Square = ({ available = false, tileColor, peice, position, reload }) => {
  const style = {
    background: tileColor,
  };

  return (
    <div
      id={position}
      className="square__box"
      style={style}
      draggable={false}
      position={position}
      onDragStart={(e) => (myMove.from = e.currentTarget.id)}
      onDragEnd={(e) => `${e.currentTarget.id}`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault(e)}
      onDragLeave={(e) => e.currentTarget.id}
      onDrop={(e) => {
        myMove.to = e.currentTarget.id;
        const movePeice = async (from = null, to = null) => {
          if (from && to && from !== to)
            await axios
              .patch(
                "http://localhost:3000/v1/chess/cafb63c6-fa0a-4de8-8ff5-bf105c073914",
                { from, to }
              )
              .catch((err) =>
                alert(err.response?.data?.message || err.message)
              );
          else myMove = { from: null, to: null };
        };

        movePeice(myMove.from, myMove.to);
        reload();
      }}
    >
      {available && <img src={peice} alt={position} />}
    </div>
  );
};

export default Square;
