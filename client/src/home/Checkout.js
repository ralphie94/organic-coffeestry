import React, { useState, useEffect } from "react";
import { getCart } from "./cartHelpers";
import { getProducts, getBraintreeClientToken } from "./apiHome";
import { isAuthenticated } from "../auth";
import  { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Checkout = () => {
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
                setData({ ...data, clientToken: data.clientToken });
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

    const showDropIn = () => (
        <div>
            {data.clientToken !== null && items.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} onInstance={instance => (data.instance = instance)} />
                    <button className="checkout-btn">Checkout</button>
                </div>
            ) : null}
        </div>
    );

    return (
        <div>
            <div>
                {showCheckout()}
            </div>
            <div>
                <h2>Total: ${getTotal()}</h2>
            </div>
        </div>
    );
};

export default Checkout;