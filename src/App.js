import './App.css';
import {BrowserRouter,Route,Link,Switch} from "react-router-dom"
import React, { useState,useEffect, } from 'react';
import { signin } from './Redux/Actions/AuthActions';
import {useDispatch,useSelector} from "react-redux";
import ChatWindow from './Screens/ChatWindow';
import Home from './Screens/Home';

function App() {
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
    
    <BrowserRouter>
    <Route exact path="/chat" component={ChatWindow}/>
    <Route exact path="/home" component={Home}/>


    </BrowserRouter>
  );
}

export default App;