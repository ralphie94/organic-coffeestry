import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import { getProducts } from "./apiHome";
import Card from "./Card";

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            // console.log("hi");
            if (error) {
                setError(error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            console.log(data);
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
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Banner />
            <h1 className="selections">Selections</h1>
            <div className="coffee-list">
                {productsBySell.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;