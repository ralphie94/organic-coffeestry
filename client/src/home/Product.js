import React, { useState, useEffect } from 'react';
import { read } from './apiHome';
import Card from './Card';

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false); 

    const loadSingleProduct = productId => {
        read(productId).then(data => {
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

    return (
        <div>
            <p>Product page</p>
            {JSON.stringify(product)}
        </div>
    );
};

export default Product;