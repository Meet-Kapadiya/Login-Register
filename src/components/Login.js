import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    async function login() {
      try {
        let response = await axios.post(process.env.REACT_APP_LOGIN_API, {
          email,
          password,
        });
        setIsLogin(true);
        setShow(true);
        history.push("/welcome");
      } catch (error) {
        setError({
          message: error.response.data.errors,
          status: error.response.status,
        });
        setIsLogin(false);
        setShow(true);
      }
    }
    login();
  }

  return (
    <div className="wrapper">
      {show ? (
        <Alert
          variant={isLogin ? "success" : "danger"}
          onClose={() => setShow(false)}
          dismissible
        >
          <p style={{ margin: "0px" }}>
            {isLogin ? "Login Successful" : error.message}
          </p>
        </Alert>
      ) : (
        ""
      )}
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" defaultChecked />
          <input type="radio" name="slide" id="signup" disabled />
          <label htmlFor="login" className="slide login">
            Login
          </label>
          <label htmlFor="signup" className="slide signup">
            Register
          </label>
          <div className="slider-tab" />
        </div>
        <div className="form-inner">
          <form action="#" className="login" onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="text"
                placeholder="Email Address"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
                required
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
                required
              />
            </div>
            <div className="pass-link">
              <a href="#">Forgot password?</a>
            </div>
            <div className="field btn">
              <div className="btn-layer" />
              <input type="submit" defaultValue="Login" />
            </div>
            <div className="signup-link">
              Not a member? <Link to="/register">Register now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
