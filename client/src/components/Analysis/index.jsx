import React from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { HiLightBulb } from "react-icons/hi";

import "./style.css";
import ME from "../../assets/images/fu1.png";
import YOU from "../../assets/images/mu1.png";
import { moveHistory } from "../../assets/data/data";

const Analysis = () => {
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
          {moveHistory.length > 0 ? (
            moveHistory.map((move, idx) => (
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
