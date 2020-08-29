import React, { useState, useEffect } from "react";
import { getCart, emptyCart } from "./cartHelpers";
import { getBraintreeClientToken, processPayment, createOrder } from "./apiHome";
import { isAuthenticated } from "../auth";
import  { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

import "./Checkout.css";

const Checkout = () => {
    const [data, setData] = useState({
        loading: false,
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

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };
    
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

    let deliveryAddress = data.address;

    const buy = () => {
        setData({ loading: true });
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
                console.log(response);

                const createOrderData = {
                    products: items,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: deliveryAddress
                };

                createOrder(userId, token, createOrderData)
                    .then(response => {
                        emptyCart(() => {
                            setRun(!run);
                            console.log("Payment success and empty cart", createOrderData);
                            setData({ loading: false, success: true });
                        });
                    });
            })
            .catch(error => {
                console.log(error);
                setData({ loading: false });
            });
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
                    <div>
                        <h2 className="delivery-address">Delivery Address</h2>
                        <textarea className="delivery-address-box" onChange={handleAddress} value={data.address} />
                    </div>
                    <DropIn options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: "vault"
                            }
                        }} 
                        onInstance={instance => (data.instance = instance)} 
                    />
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

    const showLoading = (loading) => (
        loading && <h2>Loading...</h2>
    );

    return (
        <div className="checkout">
            <div className="checkout-forms">
                {showCheckout()}
            </div>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            <h2 className="cart-total">Total: ${getTotal()}</h2>
        </div>
    );
};

export default Checkout;