import React from "react";
import "./style.css";
import Rook from "../../assets/images/br.png";

const Header = () => {
  return (
    <div className="header__container">
      <img src={Rook} alt="black-rook" />
      <h3>My Chess Game</h3>
      <img src={Rook} alt="black-rook" />
    </div>
  );
};

export default Header;
