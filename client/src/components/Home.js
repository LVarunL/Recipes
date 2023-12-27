import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import '../styles/main.css'
import { useAuth } from "./auth";
import Recipe from "./Recipe";
const LoggedInHome = () => {

    const [recipes, setRecipes] = useState([]);


    useEffect(
        ()=>{
            fetch("http://localhost:5000/recipe/recipes")
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                setRecipes(data);
            })
            .catch(err=>console.log(err));

        },[]
    );
    return (
        <div className="recipes">
            <h1> List of Recipes</h1>
            {
                recipes.map(
                    (recipe)=>{
                        return (
                        <Recipe title={recipe.title} description={recipe.description}/>
                        )
                    }
                )
            }
        </div>
    )
}

const LoggedOutHome = () => {
    return (
<div className="home container">
            <h1 className="heading"> Welcome to Recipes </h1>
            <Link to="/signup" className="btn btn-primary btn-lg"> Get Started </Link>
        </div>
    )
}

const Home = () => {

    const [logged] = useAuth();    
    return (
        <div>
            {logged?<LoggedInHome/>:<LoggedOutHome/>}
        </div>
    )
}

export default Home;