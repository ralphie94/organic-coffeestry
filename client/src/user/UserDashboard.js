import React from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

import "./UserDashboard.css";

const Dashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated();

    const userLinks = () => {
        return (
            <div className="card mb-5">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/profile/update">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"}</li>
                </ul>
            </div>
        )
    };

    const purchaseHistory = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase History</h3>
                <ul className="list-group">
                    <li className="list-group-item">History</li>
                </ul>
            </div>
        )
    };

    return (
        <div className="container-fluid">
            <h2 style={{fontFamily: "Raleway", textAlign: "center", fontSize: "40px"}}>{`Hello ${name}!`}</h2>
            <div className="row">
                    {userLinks()}
                    {userInfo()}
                    <div className="col-6 purchase-history">
                        {purchaseHistory()}
                    </div>
            </div>
        </div>
    )
};

export default Dashboard;