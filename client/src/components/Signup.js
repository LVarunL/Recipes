import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {

  const [show,setShow] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    console.log(data);

    const body = {
      username: data.username,
      email: data.email,
      password: data.password
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(body)
    }

    fetch("http://localhost:5000/auth/signup", requestOptions)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setServerResponse(data.message)
      setShow(true);
    })
    .catch(err=>console.log(err))

    reset();
  };

  return (
    <div className="Signup container">
      <div className="form">
        <h1>Sign up</h1>
        { show && 
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Yay!</Alert.Heading>
              <p>
                {serverResponse}
              </p>
          </Alert>
        }
        <form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              {...register("username", { required: true, maxLength: 25 })}
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: true, maxLength: 80 })}
            />
            {errors.email?.type === "required" && (
              <span style={{ color: "red" }}>Email is required</span>
            )}
            {errors.email?.type === "maxLength" && (
              <span style={{ color: "red" }}>
                Email must be under 80 characters
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true, minLength: 8 })}
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
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password Again"
              {...register("confirmPassword", {
                required: true,
                minLength: 8,
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword?.type === "required" && (
              <span style={{ color: "red" }}>Confirm Password is required</span>
            )}
            {errors.confirmPassword?.type === "minLength" && (
              <span style={{ color: "red" }}>
                Confirm Password must be at least 8 characters long
              </span>
            )}
            {errors.confirmPassword?.type === "validate" && (
              <span style={{ color: "red" }}>
                {errors.confirmPassword.message}
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Button
              as="sub"
              variant="primary"
              onClick={handleSubmit(submitForm)}
            >
              Sign Up
            </Button>
          </Form.Group>

          <Form.Group>
            <small>
              Already have an account? <Link to="/login"> Login </Link>
            </small>
          </Form.Group>
        </form>
      </div>
    </div>
  );
};

export default Signup;
