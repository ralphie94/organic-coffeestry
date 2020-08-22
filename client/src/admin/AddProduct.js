import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct } from './apiAdmin';

const AddProduct = () => {
    const { user, token } = isAuthenticated();
    return (
        <div>
        {`Hello ${user.name}, ready to add a new product?`}
            <div>
                <div>
                    {/* {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()} */}
                </div>
            </div>
        </div>
    );
};

export default AddProduct;