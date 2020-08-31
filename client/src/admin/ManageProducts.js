import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

import "./ManageProducts.css";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const {user, token} = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div>
            <h2 style={{fontFamily: "Raleway", textAlign: "center"}}>Manage Products</h2>
            <div className="manage-products">
                <h2 className="text-center" style={{fontFamily: "Raleway"}}>Total {products.length} products</h2>
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li key={i} className="list-group-item">
                                <div className="products-container">
                                    <h3 style={{fontFamily: "Raleway", marginTop: "10px"}}>{p.name}</h3>
                                    <Link to={`/admin/product/update/${p._id}`}>
                                        <button className="update-btn">
                                            Update
                                        </button>
                                    </Link>
                                    <button className="delete-btn" onClick={() => destroy(p._id)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
            </div>
        </div>
    );
};

export default ManageProducts;