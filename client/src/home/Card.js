import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

import "./Card.css";

const Card = ({ product }) => {
    return (
            <ul>
                <div className="main-coffee">
                    <Link to={`/product/${product._id}`}>
                        <ShowImage item={product} url="product" />
                    </Link>
                    <li><h3 className="main-coffee-name">{product.name}</h3></li>
                    <li><p className="main-price">${product.price}</p></li>
                </div>
            </ul>
    );
};

export default Card;