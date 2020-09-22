import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import "./Activate.css";

const Activate = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        error: "",
        success: false,
        show: true
    });

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        // console.log(token);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);

    const { name, token, show, success, error } = values;

    const clickSubmit = event => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/account-activation`,
            data: { token }
        })
            .then(response => {
                console.log('ACCOUNT ACTIVATION', response);
                setValues({ ...values, show: false, success: true });
            })
            .catch(error => {
                console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
            });
    };

    const activationLink = () => (
        <div className="text-center">
            <h1 className="p-5">Hey {name}, ready to activate your account?</h1>
            {showSuccess()}
            {showError()}
            <button className="activate-btn" onClick={clickSubmit}>
                Activate Account
            </button>
        </div>
    );

    const showError = () => (
        <div style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div style={{ display: success ? "" : "none" }}>
            Account has been created! Please login.
        </div>
    );

    return (
            <div className="col-md-6 offset-md-3 activate-page">
                {activationLink()}
            </div>
    );
};

export default Activate;