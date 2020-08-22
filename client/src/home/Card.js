import React from "react";
import { Link } from "react-router-dom";

import "./Card.css";

const Card = ({ product }) => {
    return (
            <ul>
                <div className="main-coffee">
                    <li><h3 className="main-coffee-name">{product.name}</h3></li>
                    <li><p className="main-price">${product.price}</p></li>
                    <button>Add to cart</button>
                </div>
            </ul>
    );
};

export default Card;