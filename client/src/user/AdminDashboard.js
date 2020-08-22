import React from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

import "./AdminDashboard.css";

const AdminDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div>
                <h4>Admin Links</h4>
                <ul className="list-group">
                    <li>
                        <Link className="nav-link" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div>
                <h3>User Information</h3>
                <ul>
                    <li>{name}</li>
                    <li>{email}</li>
                    <li>
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <div>
            <h1 className="admin-greet">{`Hello ${name}!`}</h1>
            <div className="dashboard">
                <div>{adminLinks()}</div>
                <div>{adminInfo()}</div>
            </div>
        </div>
    );
};

export default AdminDashboard;