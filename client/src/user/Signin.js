import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";

import "./Signin.css"

const Signin = () => {
    const [values, setValues] = useState({
        email: "candace@gmail.com",
        password: "candy1",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
        .then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error, loading: false })
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="login-container">
                <h1 className="login-title">Login</h1>
                {showError()}
                <h2 className="email-name">Email</h2>
                <input onChange={handleChange("email")} type="email" className="email-box" name="email" value={email}></input><br/>
                <h2 className="password">Password</h2>
                <input onChange={handleChange("password")} type="password" className="password-box" name="password" value={password}></input><br/>
                {showLoading()}
                <button onClick={clickSubmit} type="submit" className="login-btn" value="Submit">SIGN IN</button>
                <p className="register-link"><a href="/signup">Don't have an account yet?</a></p>
            </div>
        </form>
    );

    const showError = () => (
        <div style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (
            <div>
                <h2>Loading...</h2>
            </div>
        )
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/" />;
            }
        }
    };

    return (
        <div>
            {signUpForm()}
            {redirectUser()}
        </div>
    );
};

export default Signin;