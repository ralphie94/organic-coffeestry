import React, { useState, useEffect } from "react";
import { getProducts } from "./apiHome";
import { isAuthenticated } from "../auth";
import  { Link } from "react-router-dom";

const TotalPrice = ({ products }) => {
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };
    return (
        <div>
            <h2 className="total-price">Total: ${getTotal()}</h2>
        </div>
    )
};

export default TotalPrice;