import axios from "axios";
import { useParams } from "react-router-dom";
import React from "react";
import "./style.css";

let myMove = { from: null, to: null };

const Square = ({ available = false, tileColor, peice, position, reload }) => {
  const params = useParams();

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
        console.log({ myMove });
        const movePeice = async (from = null, to = null) => {
          if (from && to && from !== to) {
            const axiosConfig = {
              method: "patch",
              url: `${process.env.REACT_APP_GAME_ROOT_API}/${params.roomId}`,
              data: { from, to },
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            };

            await axios(axiosConfig).catch((err) => {
              alert(err?.response?.data?.message || err.message);
            });
          } else myMove = { from: null, to: null };
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
