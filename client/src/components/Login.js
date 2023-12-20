import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const submitForm = () => {
      console.log("Form submission");
      setUsername('')
      setPassword('')
    };
    return (
        <div className="Login">
            <div className="form">
        <h1>Login</h1>
        <form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          
          <Form.Group>
            <Button as="sub" variant="primary" onClick={submitForm}>
              Login
            </Button>
          </Form.Group>

          <Form.Group>
            <small>
                Don't have an account? <Link to="/signup"> Sign Up </Link>
            </small>
          </Form.Group>
        </form>
      </div>
        </div>
    )
}

export default Login;