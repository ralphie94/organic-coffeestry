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
            <div className="links-group">
                <h3 className="links-header">Admin Links</h3>
                <ul className="list-group">
                    <li className="links">
                        <Link className="nav-link" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li className="links">
                        <Link className="nav-link" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li className="links">
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
            <div className="info-group">
                <h3 className="links-header">User Information</h3>
                <ul>
                    <li className="links">{name}</li>
                    <li className="links">{email}</li>
                    <li className="links">
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
                <div className="admin-links">{adminLinks()}</div>
                <div className="admin-info">{adminInfo()}</div>
            </div>
        </div>
    );
};

export default AdminDashboard;