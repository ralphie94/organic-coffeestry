
import React, { useState } from 'react';
import axios from 'axios';

const Forgot = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
    });

    const { email, buttonText } = values;

    const handleChange = name => event => {
        console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: { email }
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS', response);
                setValues({ ...values });
            })
            .catch(error => {
                console.log('FORGOT PASSWORD ERROR', error.response.data);
                setValues({ ...values });
            });
    };

    const passwordForgotForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>

            <div>
                <button className="forgot-btn" onClick={clickSubmit}>
                    Reset Password
                </button>
            </div>
        </form>
    );

    return (
            <div className="col-md-6 offset-md-3">
                <h1 className="p-5 text-center">Forgot password</h1>
                {passwordForgotForm()}
            </div>
    );
};

export default Forgot;