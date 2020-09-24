import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

import "./Google.css";

const Google = () => {
    const responseGoogle = response => {
        console.log(response.tokenId);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/google-login`,
            data: { idToken: response.tokenId }
        })
            .then(response => {
                console.log('GOOGLE SIGNIN SUCCESS', response);
                // informParent(response);
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
            });
    };
    return (
        <div className="pb-3">
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="google-btn"
                    >
                        <i className="fab fa-google pr-2"></i> Login with Google
                    </button>
                )}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Google;