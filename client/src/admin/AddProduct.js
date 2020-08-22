import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct } from './apiAdmin';

import "./AddProduct.css";

const AddProduct = () => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const {
        name,
        description,
        price,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
    }, []);

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {

    };

    const newPostForm = () => (
        <div className="login-container">
            <h1 className="create-title">Create Coffee</h1>
            <form onSubmit={clickSubmit}>
                        <h2 className="create-name">Name</h2>
                        <input 
                            onChange={handleChange("name")} 
                            className="name-field" 
                            type="text" 
                            value={name} 
                        />
                        <h2 className="create-pic">Picture</h2>
                        <input 
                            onChange={handleChange("photo")} 
                            className="image-field" 
                            type="file" 
                            name="photo" 
                            accept="image/*" 
                        />
                        <h2 className="create-desc">Description</h2>
                        <textarea 
                            onChange={handleChange("description")} 
                            className="desc-field" 
                            value={description} 
                        />
                        <h2 className="create-price">Price</h2>
                        <input 
                            onChange={handleChange("price")} 
                            className="price-field" 
                            type="number" 
                            value={price} 
                        />
                        <h2 className="create-price">Shipping</h2>
                        <select onChange={handleChange("shipping")}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                        <h2 className="create-price">Quantity</h2>
                        <input 
                            onChange={handleChange("quantity")} 
                            className="price-field"
                            type="number" 
                            value={quantity} 
                        />
                        <div className="create-btn-container">
                            <input className="create-btn" type="submit" value="Create Coffee" />
                        </div>
            </form>
        </div>
    );

    return (
        <div>
            <div>
                <div>
                    {/* {showLoading()}
                    {showSuccess()}
                    {showError()} */}
                    {newPostForm()}
                </div>
            </div>
        </div>
    );
};

export default AddProduct;