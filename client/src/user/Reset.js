import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const Reset = ({ match }) => {
    // props.match from react router dom
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        error: false,
        success: false
    });

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        console.log(name);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);

    const { name, token, newPassword, success, error } = values;

    const handleChange = event => {
        setValues({ ...values, newPassword: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API_URL}/reset-password`,
            data: { newPassword, resetPasswordLink: token }
        })
            .then(response => {
                console.log('RESET PASSWORD SUCCESS', response);
                setValues({ ...values, success: true });
            })
            .catch(error => {
                console.log('RESET PASSWORD ERROR', error.response.data);
                setValues({ ...values, error: true });
            });
    };

    const passwordResetForm = () => (
        <form>
            <div className="forgot-form">
                <label className="password">Password</label>
                <input
                    onChange={handleChange}
                    value={newPassword}
                    type="password"
                    className="password-box"
                    placeholder="Type new password"
                    required
                />
                {showSuccess()}
                {showError()}
                <button className="reset-btn" onClick={clickSubmit}>
                    Reset Password
                </button>
            </div>
        </form>
    );

    const showError = () => (
        <div style={{ display: error ? "" : "none" }}>
            Expired Link. Try again.
        </div>
    );

    const showSuccess = () => (
        <div style={{ display: success ? "" : "none" }}>
            Password has been reset!
        </div>
    );

    return (
            <div className="forgot-container">
                <h2 style={{fontFamily: "Raleway", textAlign: "center", fontSize: "40px", marginTop: "3rem"}}>Hey {name}, type your new password!</h2>
                {passwordResetForm()}
            </div>
    );
};

export default Reset;