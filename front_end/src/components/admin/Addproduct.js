import React, { useState } from 'react';
import Navbar from '../partials/Navbar';
import SideNav from '../partials/SideNav';
import { motion } from 'framer-motion';
import axios from 'axios';

function AddProduct() {
    const [productData, setProductData] = useState({
        productName: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        image: null
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        setProductData({ ...productData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            for (const key in productData) {
                formData.append(key, productData[key]);
            }

            const response = await axios.post('https://grull-task-aprk.vercel.app/api/addData', formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <header id='header'>
                <Navbar />
            </header>
            <section id='body'>
                <div className="row w-100 m-0">
                    <SideNav />
                    <div className="col-md-10 MainPage">
                        <h2 className='fw-bolder text-center mb-4 pageHeading'>Add Products</h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                            className="Addproducts"
                        >
                            <h5 className="text-center">{message}</h5>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <label htmlFor="productName">Product Name</label>
                                <input type="text" id="productName" name="productName" className="form-control" value={productData.productName} onChange={handleChange} required />
                                <label htmlFor="description">Description</label>
                                <textarea id="description" name="description" rows="6" className="form-control" value={productData.description} onChange={handleChange} required></textarea>
                                <label htmlFor="category">Category</label>
                                <input type="text" id="category" name="category" className="form-control" value={productData.category} onChange={handleChange} required />
                                <label htmlFor="price">Price</label>
                                <input type="number" id="price" name="price" className="form-control" value={productData.price} onChange={handleChange} required />
                                <label htmlFor="quantity">Quantity</label>
                                <input type="number" id="quantity" name="quantity" className="form-control" value={productData.quantity} onChange={handleChange} required />
                                <label htmlFor="image">Image</label>
                                <input type="file" id="image" name="image" onChange={handleImageChange} className="form-control" />
                                <button type="submit" className="btn btn-success form-control my-2">Add Product</button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AddProduct;
