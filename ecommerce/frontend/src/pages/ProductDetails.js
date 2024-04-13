// ProductDetails.js

import React, { useState, useEffect, useContext } from 'react';
import './ProductDetails.css'; 
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard/ProductCard';
import { AuthContext } from '../Context/AuthContext';



const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [category,setCategory] = useState('');
    const [id,setId] = useState('');
    const { authToken } = useContext(AuthContext); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axios.get(`http://localhost:8000/api/products/${productId}/`);
                setProduct(productResponse.data);
                setCategory(productResponse.data.category);
                setId(productResponse.data.id);
        
                const relatedResponse = await axios.get(`http://localhost:8000/api/related-products?category=${productResponse.data.category}&exclude_id=${productResponse.data.id}`);
                setRelatedProducts(relatedResponse.data);
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [productId]);
    

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity >= 0 ? newQuantity : 0);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const addToCart = async (productId) => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/add-to-cart/',
                { product_id: productId, quantity: quantity },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            alert(response.data.message);
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error adding item to cart');
        }
    };
    

    return (
        <div className='main-container'>
        <div className="product-details-container">
            <div className="product-image">
                <img src={product.image} alt="Product" />
            </div>
            <div className="product-info">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ₹{product.price}</p>
                <div className="quantity-controls">
                    <button onClick={decreaseQuantity} disabled={quantity === 0}>
                        -
                    </button>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="0"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    <button onClick={increaseQuantity}>+</button>
                </div>
                <button className='cart-btn' onClick={() => addToCart(productId)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                Add to Cart</button>
            </div>
        </div>
        <div className='related-products-container'>
        <h2>Related Products</h2>
            {relatedProducts.map(product => (
                <Link to={`/products/${product.id}`} className='link' key={product.id}>
                   <ProductCard data={product}/>
                </Link>
                ))}
        </div>
        </div>
    );
};


export default ProductDetails;
