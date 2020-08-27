import React from "react";

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