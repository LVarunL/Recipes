import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
const CreateRecipe = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createRecipe = (data) => {
    

    const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(token)
        },
        body: JSON.stringify(data)
    }

    fetch('http://localhost:5000/recipe/recipes',requestOptions)
    .then(res=>res.json())
    .then(data=>{
        reset(); 
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className="CreateRecipe container">
      <h1>Create A Recipe</h1>
      <form>
        <Form.Group>
          <Form.Label> Title </Form.Label>
          <Form.Control
            type="text"
            {...register("title", { required: true, maxLength: 25 })}
          />
          {errors.title?.type === "required" && (
            <span style={{ color: "red" }}>title is required</span>
          )}
          {errors.title?.type === "maxLength" && (
            <span style={{ color: "red" }}>
              title must be under 25 characters
            </span>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label> Description </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            {...register("description", { required: true, maxLength: 255 })}
          />
          {errors.description?.type === "required" && (
            <span style={{ color: "red" }}>description is required</span>
          )}
          {errors.description?.type === "maxLength" && (
            <span style={{ color: "red" }}>
              description must be under 255 characters
            </span>
          )}
        </Form.Group>
        <Form.Group>
          <Button variant="primary" onClick={handleSubmit(createRecipe)}>Save</Button>
        </Form.Group>
      </form>
    </div>
  );
};

export default CreateRecipe;
