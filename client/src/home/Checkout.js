import React, { useState, useEffect } from "react";
import { getCart } from "./cartHelpers";
import { isAuthenticated } from "../auth";
import  { withRouter } from "react-router-dom";

const Checkout = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false)

    useEffect(() => {
        setItems(getCart());
    }, [run]);
    
    const getTotal = () => {
        return items.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
        </div>
    );
};

export default withRouter(Checkout);