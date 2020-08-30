import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders } from "./apiAdmin";
import moment from "moment";

import "./Orders.css";

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

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 style={{fontFamily: "Raleway"}}>Total orders: {orders.length}</h1>
            );
        } else {
            return <h1 style={{fontFamily: "Raleway"}}>No orders</h1>
        }
    };

    const showInput = (key, value) => (
        <div>
            <div>
                <div>{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly/>
        </div>
    );

    return(
        <div>
            <h1 style={{textAlign: "center", fontFamily: "Raleway"}}>Manage orders here</h1>
            <div>
                <div className="orders-layout">
                <hr />
                    {showOrdersLength()}
                    {orders.map((o, oIndex) => {
                        return(
                            <div key={oIndex}>
                                <h2>
                                    <span className="order-id">
                                        Order ID: {o._id}
                                    </span>
                                </h2>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        {o.status}
                                    </li>
                                    <li className="list-group-item">
                                        Transaction ID: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered by: {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on: {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.address}
                                    </li>
                                </ul>
                                <h3 className="total-order">
                                    Total products in the order: {o.products.length}
                                </h3>
                                {o.products.map((p, pIndex) => (
                                    <div className="mb-4" key={pIndex} style={{padding: "20px", border: "1px solid black"}}>
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}
                                <hr/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Orders;