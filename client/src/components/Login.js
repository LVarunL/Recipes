import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import {login} from './auth'
const Login = () => {

    const navigate = useNavigate();
    const {register, handleSubmit, watch,reset, formState:{errors}} = useForm();

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
  
    const loginUser = (data) => {
      console.log(data);

      const requestOptions = {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }

      fetch('http://localhost:5000/auth/login',requestOptions)
      .then(res=>res.json())
      .then(data=>{
        console.log(data.access_token);
        login(data.access_token)
        navigate('/')
      })


      reset();
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
              {...register('username',{required: true,maxLength:25})}
            />
            {errors.username?.type === "required" && (
              <span style={{ color: "red" }}>Username is required</span>
            )}
            {errors.username?.type === "maxLength" && (
              <span style={{ color: "red" }}>
                Username must be under 25 characters
              </span>
            )}
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              {...register('password',{required: true,minLength:8})}
            />
            {errors.password?.type === "required" && (
              <span style={{ color: "red" }}>Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span style={{ color: "red" }}>
                Password must be at least 8 characters long
              </span>
            )}
          </Form.Group>
          
          <Form.Group>
            <Button as="sub" variant="primary" onClick={handleSubmit(loginUser)}>
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