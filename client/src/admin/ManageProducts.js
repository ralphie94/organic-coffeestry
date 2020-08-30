import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
    return (
        <div>
            <h1>Manage Products</h1>
            <div>
                
            </div>
        </div>
    );
};

export default ManageProducts;