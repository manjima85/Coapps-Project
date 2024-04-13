import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductsList.css'; 
import ProductCard from '../components/ProductCard/ProductCard';
import {Link} from 'react-router-dom';


const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products/');
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="products-container">
            <div className="products">
                {products.map(product => (
                <Link to={`/products/${product.id}`} className='link' key={product.id}>
                   <ProductCard data={product}/>
                </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;


// <div key={product.id} className="product-card">
// <img src={product.image} alt={product.name} className="product-image" />
// <div className="product-details">
//     <h3 className="product-name">{product.name}</h3>
//     <p className="product-price">${product.price}</p>
//     <a href={`/products/${product.id}`} className="product-link">View Details</a>
// </div>
// </div>