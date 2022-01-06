import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [error, setError] = useState({});
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setShow(true);
    if (!(password === rePassword)) {
      setError({
        message: "Password Mismatch",
      });
      return;
    }
    setIsLoading(true);
    async function register() {
      try {
        await axios.post(process.env.REACT_APP_REGISTER_API, {
          email,
          password,
          name,
          mobile,
        });
        setIsLoading(false);
        setIsRegister(true);
      } catch (error) {
        setIsLoading(false);
        setIsRegister(false);
        setError({
          message:
            error.response.status === 400
              ? "Fields Are Missing Or Incorrect"
              : "User Already Exists",
          status: error.response.status,
        });
      }
    }
    register();
  }

  return (
    <div className="wrapper">
      {show ? (
        <Alert
          variant={isLoading ? "info" : isRegister ? "success" : "danger"}
          onClose={() => setShow(false)}
          dismissible
        >
          <p style={{ margin: "0px" }}>
            {isLoading
              ? "Loading . . . "
              : isRegister
              ? "Registration Successful"
              : error.message}
          </p>
        </Alert>
      ) : (
        ""
      )}
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" disabled />
          <input type="radio" name="slide" id="signup" defaultChecked />
          <label htmlFor="login" className="slide login">
            Login
          </label>
          <label htmlFor="signup" className="slide signup">
            Register
          </label>
          <div className="slider-tab" />
        </div>
        <div className="form-inner">
          <form action="#" className="signup" onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="text"
                placeholder="Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
                required
              />
            </div>
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
                type="text"
                placeholder="Contact Number"
                onChange={(event) => {
                  setMobile(event.target.value);
                }}
                value={mobile}
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
            <div className="field">
              <input
                type="password"
                placeholder="Confirm password"
                onChange={(event) => {
                  setrePassword(event.target.value);
                }}
                value={rePassword}
                required
              />
            </div>
            <div className="field btn">
              <div className="btn-layer" />
              <input type="submit" defaultValue="Signup" />
            </div>
            <div className="signin-link">
              Already have an account? <Link to="/">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
