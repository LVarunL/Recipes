import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";
import { useAuth } from "./auth";
import Recipe from "./Recipe";
import { Modal, Form, Button } from "react-bootstrap";
import { set, useForm } from "react-hook-form";

const LoggedInHome = () => {
  const [recipes, setRecipes] = useState([]);
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();



  const getAllRecipes = () => {
    fetch("http://localhost:5000/recipe/recipes")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setRecipes(data);
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllRecipes();
  }, []);

  
  const closeModal = () => {
    setShow(false);
  };

  const showModal = (id) => {
    setShow(true);
    setRecipeId(id);
    recipes.map((recipe)=>{
        if(recipe.id===id){
            setValue('title',recipe.title)
            setValue('description',recipe.description)
        }
    })
  };

  const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
  const updateRecipe = (data) => {
    

    const requestOptions = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(token)
        },
        body: JSON.stringify(data)
    }

    fetch(`http://localhost:5000/recipe/recipe/${recipeId}`,requestOptions)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data);
        getAllRecipes();
        closeModal();
    })
    .catch(err=>console.log(err))
  }

  const deleteRecipe = (id) => {

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(token)
        }
    }
    fetch(`http://localhost:5000/recipe/recipe/${id}`,requestOptions)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data);
        getAllRecipes();
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className="recipes">
      <Modal show={show} size="lg" onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Recipe</Modal.Title>
          <Modal.Body>
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
          <Button variant="primary" onClick={handleSubmit(updateRecipe)}>Save</Button>
        </Form.Group>
      </form>
          </Modal.Body>
        </Modal.Header>
      </Modal>
      <h1> List of Recipes</h1>
      {recipes.map((recipe,index) => {
        return (
          <Recipe
            title={recipe.title}
            key={index}
            description={recipe.description}
            onClick={()=>showModal(recipe.id)}
            onDelete = {()=>{deleteRecipe(recipe.id)}}
          />
        );
      })}
    </div>
  );
};

const LoggedOutHome = () => {
  return (
    <div className="home container">
      <h1 className="heading"> Welcome to Recipes </h1>
      <Link to="/signup" className="btn btn-primary btn-lg">
        {" "}
        Get Started{" "}
      </Link>
    </div>
  );
};

const Home = () => {
  const [logged] = useAuth();
  return <div>{logged ? <LoggedInHome /> : <LoggedOutHome />}</div>;
};

export default Home;
