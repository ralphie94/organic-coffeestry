import React, { useState } from "react";
import { API } from "../config";

import "./Signup.css"

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    };

    const signup = (user) => {
        fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        signup({ name, email, password });
    };

    const signUpForm = () => (
        <form>
            <div className="login-container">
                <h1 className="register-title">Register</h1>
                <h2 className="username">Username</h2>
                <input onChange={handleChange("name")} type="text" className="name-register" name="username"></input><br/>
                <h2 className="password">Password</h2>
                <input onChange={handleChange("email")} type="email" className="email-box" name="password"></input><br/>
                <h2 className="email">Email</h2>
                <input onChange={handleChange("password")} type="password" className="password-register" name="password"></input><br/>
                <button onClick={clickSubmit} type="submit" className="register-btn" value="Submit">CREATE</button>
            </div>
        </form>
    )

    return (
        <div>
            {signUpForm()}
        </div>
    );
};

export default Signup;