import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const CartCoffee = ({ product, cartUpdate = false }) => {

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>increment/decrement</div>
    };

    return(
        <div className="cart-container">
            <ul>
                <hr className="top-line"></hr>
                <div className="list-container">
                    <div className="img-name-price">
                        <div>
                            <li><Link to={`/product/${product._id}`}><ShowImage className="cart-coffee" item={product} url="product" /></Link></li>
                        </div>
                        <div className="name-remove">
                            <li><h3 className="cart-coffee-name">{product.name}</h3></li>
                            <li><button className="remove-btn">REMOVE</button></li>
                        </div>
                    </div>
                    <div className="quan-price">
                        <li>{showCartUpdateOptions(cartUpdate)}</li>
                        <li><p className="cart-price">${product.price}</p></li>
                    </div>
                </div>
            </ul>
        </div>
    );
};

export default CartCoffee;