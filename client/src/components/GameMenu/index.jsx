import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import "./index.css";

const GameMenu = () => {
  const navigate = useNavigate();
  const roomIdRef = useRef();

  const [currentItem, setCurrentItem] = useState("create new game");
  const [pastGame, setPastGame] = useState([]);

  // Create a new Game Room
  const createNewGameHandler = async () => {
    const token = localStorage.getItem("token");
    if (!token) window.history.pushState(null, null, "../");
    else {
      const axiosConfig = {
        method: "POST",
        url: process.env.REACT_APP_GAME_ROOT_API,
        data: { type: "create" },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(axiosConfig)
        .then((response) => {
          navigate(`${response.data.roomId}`);
        })
        .catch((err) => {
          alert(err?.response?.data?.message || err.message);
        });
    }
  };

  // Join a Existing Room
  const joinGamehandler = async (roomId) => {
    const token = localStorage.getItem("token");
    if (!token) window.history.pushState(null, null, "../");
    else {
      const axiosConfig = {
        method: "POST",
        url: process.env.REACT_APP_GAME_ROOT_API,
        data: { type: "join", roomId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(axiosConfig)
        .then((response) => {
          console.log({ response });
          navigate(`${response.data.roomId}`);
        })
        .catch((err) => {
          alert(err?.response?.data?.message || err.message);
        });
    }
  };

  // Watch Live Game in a Room
  const watchLiveGame = async () => {
    alert("This Feature is yet to be implemented!");
  };

  // Handle input Form
  const formHandler = async ({ type, roomId }) => {
    if (type === "join game") {
      joinGamehandler(roomId);
    } else if (type === "watch game live") {
      watchLiveGame();
    }
  };

  // past game handler
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(process.env.REACT_APP_GAME_ROOT_API, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => {
          setPastGame(resp.data.listOfPastRooms);
        })
        .catch((err) =>
          alert(`${err?.response?.data?.message || err.message}`)
        );
    };

    if (currentItem === "My Past Games") fetchData();
  }, [currentItem]);

  return (
    <div className="container__gameMenu">
      <h1>GAME MENU</h1>
      {/* Show menu item buttons */}
      <div className="menuItem">
        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentItem("create new game");

            createNewGameHandler(e);
          }}
          className="btn"
        >
          Create a New Game
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentItem("join game");
          }}
          className="btn"
        >
          Join Game
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentItem("My Past Games");
          }}
          className="btn"
        >
          My Past Games
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentItem("watch game live");
          }}
          className="btn"
        >
          ♛ Watch Live Game ♛
        </button>
      </div>

      {/* show input form details */}
      <div
        className={`menu__details ${
          ["create new game", "My Past Games"].includes(currentItem)
            ? "hidden"
            : ""
        }`}
      >
        <h3>Please Enter the Details</h3>

        <div className="inputSection">
          <input
            type="text"
            ref={roomIdRef}
            required
            placeholder="please Enter Room ID"
          />

          <button
            className={`btn ${currentItem.replaceAll(" ", "_")}`}
            onClick={(e) => {
              e.preventDefault();

              formHandler({
                type: currentItem,
                roomId: roomIdRef.current.value,
              });
            }}
          >
            {currentItem}
          </button>
        </div>
      </div>

      {/* Display past game history */}
      <div
        className={`menu__details ${
          ["My Past Games"].includes(currentItem) ? "" : "hidden"
        }`}
      >
        <h3>My Past Games</h3>
        <div className="menu_details__past_games">
          {pastGame.length > 0 &&
            pastGame.map((game, idx) => (
              <Link to={game.roomId} className="past_game__card" key={idx}>
                {game.roomId}
                <span>
                  <p>Created On: {game.createdAt}</p>
                  <p>Last Updated At: {game.updatedAt}</p>
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
