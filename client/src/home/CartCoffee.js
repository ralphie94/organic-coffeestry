import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import { updateItem, removeItem } from "./cartHelpers";
import { getProducts } from "./apiHome";

const CartCoffee = ({ 
    product, 
    cartUpdate = false, 
    showRemoveProductButton = false, 
    setRun = f => f, 
    run = undefined
}) => {
    const [count, setCount] = useState(product.count);

    const handleChange = productId => event => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1) {
            updateItem(productId, event.target.value)
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && 
            <div>
                <input type="number" className="quantity-field" value={count} onChange={handleChange(product._id)}></input>
            </div>
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
          showRemoveProductButton && (
            <button
              onClick={() => {
                removeItem(product._id);
                setRun(!run);
              }}
              className="remove-btn"
            >
              REMOVE
            </button>
          )
        );
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
                            <li><h3 className="cart-coffee-name"><span className="break">{product.name}</span></h3></li>
                            <li>{showRemoveButton(showRemoveProductButton)}</li>
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