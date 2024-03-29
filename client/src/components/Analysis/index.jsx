import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { HiLightBulb } from "react-icons/hi";

import "./style.css";
import ME from "../../assets/images/fu1.png";
import YOU from "../../assets/images/mu1.png";

const Analysis = () => {
  const params = useParams();

  const [history, setHistory] = useState("[]");

  useEffect(() => {
    const fetchAndSetHistory = async () => {
      const { roomId } = params;
      const axiosConfig = {
        method: "get",
        url: `${process.env.REACT_APP_GAME_ROOT_API}/${roomId}?type=history`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios(axiosConfig)
        .then((resp) => {
          const parsedHistory = resp.data.data.map((current) => [
            current.from,
            current.to,
          ]);
          setHistory(JSON.stringify(parsedHistory));
        })
        .catch((err) => {
          alert(err?.response?.data?.message || err.message);
        });
    };

    fetchAndSetHistory();
  }, [history, params]);
  return (
    <div className="container analysis__container">
      <div className="analysis__info">
        <div className="analysis__info__me">
          <img src={ME} alt="me" />
          <p>59:59</p>
        </div>

        <div className="analysis__info__opponent">
          <img src={YOU} alt="you" />
          <p>59:59</p>
        </div>
      </div>

      <div className="analysis__move-history">
        <h3>Move History</h3>

        <div>
          {JSON.parse(history).length > 0 ? (
            JSON.parse(history).map((move, idx) => (
              <ul className="analysis_move-history__row" key={idx}>
                <li>{idx + 1}</li>
                <li>{move[0]}</li>
                <li>{move[1]}</li>
              </ul>
            ))
          ) : (
            <p>No Move Yet!</p>
          )}
        </div>
      </div>
      <div className="analysis__action_buttons">
        <h3>Actions</h3>

        <div>
          <AiOutlinePlus
            className="action_icons"
            onClick={(e) => console.log(e.target)}
          />
          <FaArrowAltCircleLeft className="action_icons" />
          <FaArrowAltCircleRight className="action_icons" />
          <HiLightBulb className="action_icons" />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
