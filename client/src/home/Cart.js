import React, { useState, useEffect } from "react";
import { getCart, getTotal } from "./cartHelpers";
import { getProducts } from "./apiHome";
import { Link } from "react-router-dom";
import CartCoffee from "./CartCoffee";
import TotalPrice from "./TotalPrice";

import "./Cart.css";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false)

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h1 className="user-cart-title">YOUR CART</h1>
                <div className="cart-titles">
                    <h4 className="product-cart">PRODUCT</h4>
                    <h4 className="quantity-cart">QUANTITY</h4>
                    <h4 className="total-cart">PRICE</h4>
                </div>
                {items.map((product, i) => (
                <CartCoffee 
                    key={i} 
                    product={product} 
                    cartUpdate={true} 
                    showRemoveProductButton={true} 
                    setRun={setRun}
                    run={run}
                />))}
                <hr className="bottom-line"></hr>
                <div className="bottom-cart-container">
                    <TotalPrice products={items} />
                    <div className="cart-buttons">
                        <Link to="/"><button className="continue-btn"> CONTINUE SHOPPING</button></Link>
                        <button className="checkout-btn"> CHECKOUT</button>
                    </div>
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