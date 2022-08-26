import React from "react";
import { IoSend } from "react-icons/io5";
import CTA from "./CTA";
import { messagehistory } from "../../assets/data/data";
import "./style.css";

const Chat = () => {
  return (
    <React.StrictMode>
      <div className="container chat__container">
        {/* camera section */}
        <div className="cameras">
          <div className="camera__me"></div>
          <div className="camera__you"></div>
        </div>

        {/* message history section */}
        <div className="chatHistory">
          <h3 className="text-variant">Messages</h3>
          <ul className="messages">
            {messagehistory.map((current, idx) => (
              <CTA {...current} key={idx} />
            ))}
          </ul>
        </div>

        {/* send message section */}
        <form action="">
          <input
            type="text"
            name="message"
            required
            placeholder="enter your message"
          />

          <a
            href="."
            onClick={(e) => e.preventDefault()}
            className="btn btn-primary"
          >
            <IoSend />
          </a>
        </form>
      </div>
    </React.StrictMode>
  );
};

export default Chat;
