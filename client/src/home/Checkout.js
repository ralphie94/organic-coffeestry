import React, { useState, useEffect } from "react";
import { getCart } from "./cartHelpers";
import { getBraintreeClientToken, processPayment } from "./apiHome";
import { isAuthenticated } from "../auth";
import  { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

import "./Checkout.css";

const Checkout = ({ item, url }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        address: ""
    });
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                setData({ ...data, error: data.error });
            } else {
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        setItems(getCart());
        getToken(userId, token)
    }, [run]);
    
    const getTotal = () => {
        return items.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="signin">
                <button className="checkout-btn">Login to checkout</button>
            </Link>
        );
    };

    const buy = () => {
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            // console.log(data);
            nonce = data.nonce;
            // console.log("Send nonce and total to process: ", nonce, getTotal(items));
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(items)
            }
            processPayment(userId, token, paymentData)
            .then(response => {
                setData({ ...data, success: response.success });
            })
            .catch(error => console.log(error));
        })
        .catch(error => {
            // console.log("Dropin error: ", error);
            setData({ ...data, error: error.message });
        });
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: "" })}>
            {data.clientToken !== null && items.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} onInstance={instance => (data.instance = instance)} />
                    <button onClick={buy} className="pay-btn">PAY</button>
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div style={{ display: success ? "" : "none" }}>
            Thank you! Your payment was successful!
        </div>
    );

    return (
        <div className="checkout">
            <div className="checkout-forms">
                {showCheckout()}
            </div>
            {showSuccess(data.success)}
            {showError(data.error)}
            <h2 className="cart-total">Total: ${getTotal()}</h2>
        </div>
    );
};

export default Checkout;