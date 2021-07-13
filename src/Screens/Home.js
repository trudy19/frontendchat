import PropTypes from 'prop-types';
import {BrowserRouter,Route,Link,Switch} from "react-router-dom"
import React, { useState,useEffect, } from 'react';
import {useDispatch,useSelector} from "react-redux";
import { signin } from '../Redux/Actions/AuthActions';


Home.propTypes = {
    
};

function Home(props) {
    const [userId,setuserId]=useState('');
    const [username,setuserName]=useState('');
  
  
     
  const dispatch=useDispatch();
  const submitHandler = (e) => {
    console.log(userId)
    console.log(username)
  
      e.preventDefault();
    
      dispatch(signin(username,userId));
      console.log("jjjdfkdfkdfldkfdkkdgogoo")
      
    };
    return (
  <div className="App">
    <form className="form-register" onSubmit={submitHandler}>
   
   <ul className="form-container-register">

       <li> 
           <label>userId</label>
           <input name="userid" type="text" required="true" onChange={(e)=>setuserId(e.target.value) } ></input>  
       </li>
        <li>
           <label>username</label>
            <input name="username"  type="text" required="true" onChange={(e)=>setuserName(e.target.value) } ></input>  
       </li>
       <li>
            <button type="submit" className="button primary">Register</button>
        </li>
       </ul>
       </form>
    </div>

    );
}

export default Home;