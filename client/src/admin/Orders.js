import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders } from "./apiAdmin";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const {user, token} = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
    }, [])

    const noOrders = orders => {
        return orders.length < 1 ? <h4>No orders</h4> : null;
    };

    return(
        <div>
            <h1>Manage all the orders here</h1>
            {noOrders(orders)}
            {JSON.stringify(orders)}
        </div>
    );
};

export default Orders;