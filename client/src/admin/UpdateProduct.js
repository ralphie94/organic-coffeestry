import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import { getProduct, updateProduct } from './apiAdmin';

const UpdateProduct = ({ match }) => {
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

    const { user, token } = isAuthenticated();
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

    const init = (productId) => {
        getProduct(productId).then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        updateProduct(match.params.productId, user._id, token, formData)
        .then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    values, 
                    name: "", 
                    description: "", 
                    photo: "", 
                    price: "", 
                    quantity: "", 
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name
                });
            }
        })
    };

    const newPostForm = () => (
        <div className="login-container">
            <h1 className="create-title">Update Product</h1>
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
                        {showSuccess()}
                        <div className="create-btn-container">
                            <button className="create-btn" type="submit">Update Coffee</button>
                        </div>
            </form>
        </div>
    );

    const showError = () => (
        <div style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div>
                <h2>Loading...</h2>
            </div>
    );

    const redirectUser = () => {
        if(redirectToProfile) {
            if(!error) {
                return <Redirect to="/" />
            }
        }
    };

    return (
        <div>
            <div>
                <div>
                    {showLoading()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;