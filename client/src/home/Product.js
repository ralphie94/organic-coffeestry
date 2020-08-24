import React, { useState, useEffect } from 'react';
import { read } from './apiHome';
import Card from './Card';
import ShowImage from "./ShowImage";
import { addItem } from "./cartHelpers";
import { Redirect } from "react-router-dom";

import "./Product.css";

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false); 
    const [redirect, setRedirect] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            console.log(data);
            if(data.error) {
                setError(data.error);
            } else {
                setProduct(data);
            }
        });
    };  

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, []);

    const showStock = quantity => {
        return quantity > 0 ? (
          <span>In Stock </span>
        ) : (
          <span>Out of Stock </span>
        );
      };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        });
    };

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    };

    return (
        <div className="coffee-show-container">
            <ul>
                <li><ShowImage className="coffee-show" item={product} url="product" /></li>
                <div className="coffee-info">
                    {shouldRedirect(redirect)}
                    <li><h1 className="coffee-name">{product && product.name}</h1></li>
                    <div className="price-cart-btn">
                        <li><p className="coffee-show-price">${product.price}</p></li>
                        <button onClick={addToCart} className="add-to-cart">ADD TO CART</button>
                    </div>
                    {showStock(product.quantity)}
                    <li><p>{product.description && product.description && product.description.substring(0, 100)}</p></li>
                </div>
            </ul>
        </div>
    );
};

export default Product;