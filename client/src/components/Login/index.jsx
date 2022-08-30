import React, { useState } from "react";
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
    if (localStorage.getItem("token") === "test@email.com")
      navigate(`/game?room=${localStorage.getItem("token")}`);
    // eslint-disable-next-line
  }, []);

  const mocksigninApi = (email, password) => {
    console.log({ email, password });
    if (email === "test@email.com" && password === "test@email.com")
      return Promise.resolve("success");
    else return Promise.reject("incorrect creds");
  };

  const mockSignupApi = (name, email, password, cnfPassword) => {
    if (password !== cnfPassword || !(name && email && password)) {
      throw new Error("incorrect input");
    }
    return Promise.resolve("success");
  };

  const formHandler = async (e) => {
    e.preventDefault();

    if (type === "signup") {
      const { name, email, password, cnfPassword } = e.currentTarget;
      await mockSignupApi(
        name.value,
        email.value,
        password.value,
        cnfPassword.value
      )
        .then(alert)
        .catch(alert);
    }

    if (type === "signin") {
      const { email, password } = e.currentTarget;
      await mocksigninApi(email.value, password.value)
        .then((data) => {
          localStorage.setItem("token", email.value);
          navigate(`/game?roomId=${email.value}`);
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <div className="login__container">
      <div className="actionBtn">
        <button
          onClick={(e) => setType("signin")}
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
