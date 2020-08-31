import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const { name, email, password, error, success } = values;
    const { token } = isAuthenticated();

    const init = userId => {
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="login-container">
                <h1 className="register-title">Profile Update</h1>
                <h2 className="username">Name</h2>
                <input onChange={handleChange("name")} type="text" className="name-register" name="username" value={name}></input><br/>
                <h2 className="email">Email</h2>
                <input onChange={handleChange("email")} type="email" className="email-box" name="email" value={email}></input><br/>
                <h2 className="password">Password</h2>
                <input onChange={handleChange("password")} type="password" className="password-register" name="password" value={password}></input><br/>
                <button onClick={clickSubmit} type="submit" className="register-btn" value="Submit">UPDATE</button>
            </div>
        </form>
    );

    return(
        <div>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </div>
    )
};

export default Profile;