import React, { useState, useEffect } from "react";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";
import CartCoffee from "./CartCoffee";

import "./Cart.css";

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, []);

    const showItems = items => {
        return (
            <div>
                <h1 className="user-cart-title">YOUR CART</h1>
                <h4 className="product-cart">PRODUCT</h4>
                <h4 className="quantity-cart">QUANTITY</h4>
                <h4 className="total-cart">TOTAL</h4>
                {items.map((product, i) => (<CartCoffee key={i} product={product} cartUpdate={true} />))}
                <hr className="bottom-line"></hr>
                <div className="cart-buttons">
                    <Link to="/"><button className="continue-btn"> CONTINUE SHOPPING</button></Link>
                    <button className="checkout-btn"> CHECKOUT</button>
                </div>
            </div>
        );
    };

    const noItemsMessage = () => (
        <div>
            <h2>Your cart is empty. Go buy some coffee!</h2>
            <button>Continue shopping</button>
        </div>
    );

    return (
        <div>
            <div>
                {items.length > 0 ? showItems(items) : noItemsMessage()}
            </div>
            <div>

            </div>
        </div>
    );
};

export default Cart;