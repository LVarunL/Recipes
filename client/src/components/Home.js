import React from "react";
import { Link } from "react-router-dom";
import '../styles/main.css'

const Home = () => {
    return (
        <div className="home container">
            <h1 className="heading"> Welcome to Recipes </h1>
            <Link to="/signup" className="btn btn-primary btn-lg"> Get Started </Link>
        </div>
    )
}

export default Home;