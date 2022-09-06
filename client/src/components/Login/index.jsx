import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("signin");
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token"))
      navigate(`/game/${localStorage.getItem("token")}`);
    // eslint-disable-next-line
  }, []);

  const formHandler = async (e) => {
    e.preventDefault();

    if (type === "signup") {
      const { name, email, password, cnfPassword } = e.currentTarget;

      const axiosConfig = {
        method: "post",
        url: process.env.REACT_APP_SIGNUP_API,
        data: {
          name: name.value,
          email: email.value,
          password: password.value,
          passwordConfirm: cnfPassword.value,
          photo: "dummy image",
        },
      };

      await axios(axiosConfig)
        .then(({ data }) => {
          const { token } = data;
          if (token) {
            localStorage.setItem("token", token);
            setType("signin");
          }
        })
        .catch((err) => {
          alert(err?.response?.data?.message || err.message);
        });
    }

    if (type === "signin") {
      const { email, password } = e.currentTarget;

      const axiosConfig = {
        method: "post",
        url: process.env.REACT_APP_SIGNIN_API,
        data: {
          email: email.value,
          password: password.value,
        },
      };

      await axios(axiosConfig)
        .then(({ data }) => {
          navigate(`/${data.user._id}`);
        })
        .catch((err) => {
          console.log(err);
          alert(err?.response?.data?.message || err.message);
        });
    }
  };

  return (
    <div className="login__container">
      <div className="actionBtn">
        <button
          onClick={() => setType("signin")}
          className={`btn btn-primary ${type === "signin" ? "active" : ""}`}
        >
          SignIn
        </button>

        <button
          onClick={(e) => setType("signup")}
          className={`btn btn-primary ${type === "signup" ? "active" : ""}`}
        >
          Signup
        </button>
      </div>

      <form className="inputSection" onSubmit={formHandler}>
        <input
          type="text"
          placeholder="Please enter your name"
          required={type === "signup"}
          name="name"
          hidden={type === "signin"}
          minLength={4}
          value={info.name}
          onChange={(e) => setInfo({ ...info, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter your email"
          required
          name="email"
          value={info.email}
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Enter your password"
          required
          name="password"
          minLength={8}
          value={info.password}
          onChange={(e) => setInfo({ ...info, password: e.target.value })}
        />

        <input
          type="password"
          placeholder="Confirm your password"
          required={type === "signup"}
          hidden={type === "signin"}
          name="cnfPassword"
          value={info.cnfPassword}
          onChange={(e) => setInfo({ ...info, cnfPassword: e.target.value })}
        />

        <input type="submit" value={type} />
      </form>
    </div>
  );
};

export default Login;
