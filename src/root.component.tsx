import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import axios from "axios";
//const classes = require('./login.module.css');
import "./style.component.css"

export default function Root(props) {
  const [data, setData] = useState({
    name:"",
    email: "",
    password: ""
  })

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const { name, email, password } = data;

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  }

  const submitHandler = e => {
    e.preventDefault();
    const userData = {
      name: data.name.toString(),
      email: data.email.toString(),
      password: data.password.toString()
    };

    console.log(userData)
    
    axios.post("http://localhost:8000/api/signup", userData).then((response) => {
      console.log(response);
      if(response.status == 200)
      {
        setSuccessful(true);
        window.location.href = "/login";
      }
    }).catch((error) => {
      console.log(error);
      const resMessage = "Signup failed!";
      setMessage(resMessage);  
      setSuccessful(false);
    });
    
  }
  return (
    <BrowserRouter basename="/">
      {!successful && (
        <div className="login-page" >
          <div className="form">
            <form onSubmit={submitHandler}>
              <input type="text" placeholder="name" name="name" value={name} onChange={changeHandler} />
              <input type="text" placeholder="email address" name="email" value={email} onChange={changeHandler} />
              <input type="password" placeholder="password" name="password" value={password} onChange={changeHandler} />
              <button>create</button>
              <p className="message">Already registered? <a href="/login">Sign In</a></p>
            </form>
          </div>
        </div>
      )}
      {message && (
        <div className="form-group">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </BrowserRouter>
  )
}
