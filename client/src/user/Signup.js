import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";

import "./Signup.css"

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, success, error } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password })
        .then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password:"",
                    error: "",
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="login-container">
                <h1 className="register-title">Register</h1>
                {showError()}
                <h2 className="username">Name</h2>
                <input onChange={handleChange("name")} type="text" className="name-register" name="username" value={name}></input><br/>
                <h2 className="email">Email</h2>
                <input onChange={handleChange("email")} type="email" className="email-box" name="email" value={email}></input><br/>
                <h2 className="password">Password</h2>
                <input onChange={handleChange("password")} type="password" className="password-register" name="password" value={password}></input><br/>
                {showSuccess()}
                <button onClick={clickSubmit} type="submit" className="register-btn" value="Submit">CREATE</button>
            </div>
        </form>
    );

    const showError = () => (
        <div style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div style={{ display: success ? "" : "none" }}>
            Account created successfully! Please <Link to="/signin">login</Link>.
        </div>
    );

    return (
        <div>
            {signUpForm()}
        </div>
    );
};

export default Signup;