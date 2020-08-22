import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import { getProducts } from "./apiHome";

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts("sold").then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
    }, []);

    return (
        <div>
            <Banner />
            {JSON.stringify(productsByArrival)}
            <hr/>
            {JSON.stringify(productsBySell)}
        </div>
    );
};

export default Home;