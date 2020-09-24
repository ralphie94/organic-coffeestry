import React, { useState } from 'react';
import axios from 'axios';

import "./Forgot.css";

const Forgot = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        error: "",
        success: false
    });

    const { email, success, error } = values;

    const handleChange = name => event => {
        console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API_URL}/forgot-password`,
            data: { email }
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS', response);
                setValues({ ...values, success: true });
            })
            .catch(error => {
                console.log('FORGOT PASSWORD ERROR', error.response.data);
                setValues({ ...values });
            });
    };

    const passwordForgotForm = () => (
        <form>
            <div className="forgot-form">
                <label className="email-name">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="email-box" />
                {showSuccess()}
                {showError()}
                <button className="reset-btn" onClick={clickSubmit}>
                    Request Link
                </button>
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
            Email has been sent!
        </div>
    );

    return (
            <div className="forgot-container">
                <h2 style={{fontFamily: "Raleway", textAlign: "center", fontSize: "40px", marginTop: "3rem"}}>Forgot Password</h2>
                {passwordForgotForm()}
            </div>
    );
};

export default Forgot;