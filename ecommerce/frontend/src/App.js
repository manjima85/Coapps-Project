// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import WithAuth from './Auth'; // Import the WithAuth component

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route path="/products/:productId" element={<WithAuth><ProductDetails /></WithAuth>} /> {/* Protected route */}
                    <Route path='/cart' element={<WithAuth><Cart /></WithAuth>} /> {/* Protected route */}
                </Routes>
            </Router>
        </div>
    );
};

export default App;
