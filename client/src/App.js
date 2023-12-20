import './App.css';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import CreateRecipe from './components/CreateRecipe';

function App() {


  // const [message, setMessage] = useState('');
  // useEffect(
  //   () => {
  //   console.log('App is running');
  //   fetch('http://localhost:5000/recipe/hello')
  //   .then(response=>response.json())
  //   .then(data=>{
  //     console.log(data)
  //     setMessage(data.message);
  //   })
  //   .catch(err=>console.log(err))
    
  // }, []);
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={ <Login/>}/>
          <Route path='/create_recipe' element={ <CreateRecipe/>}/>
          <Route path='/' element={ <Home/>}/>
           

        </Routes>
      </div>
    </Router>
  );
}

export default App;
