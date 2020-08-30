import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

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
            <h1>Manage Products</h1>
            <div>
                <ul>
                    {products.map((p, i) => (
                        <li key={i}>
                            <strong>{p.name}</strong>
                            <Link to={`/admin/product/update/${p._id}`}>
                                <button>
                                    Update
                                </button>
                            </Link>
                            <button onClick={() => destroy(p._id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ManageProducts;