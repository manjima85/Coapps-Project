import React from 'react'
import './Header.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header-container'>
        {/*Logo*/}
        <div className='logo'>
            <img src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png" alt='Logo'/>
            <h2>E-Commerce</h2>
        </div>
        <div className='search-container'>
            <div className='search-box'>
                <button className='category'>
                  <ArrowDropDownIcon/>
                  Categories
                </button>
                <input type='text' placeholder='Search here..'/>
                <button>
                    <SearchIcon/>
                </button>
            </div>
            <div className='location'>
                <LocationOnOutlinedIcon/>
                <p>Location</p>
            </div>
        </div>
        <div className='header-options-container'>
                <div className='option'>
                    <FavoriteBorderIcon/>
                    <p>Wishlist</p>
                </div>
                <div className='option'>
                    <Link to={'/cart'}>
                    <ShoppingCartOutlinedIcon/>
                    <p>Cart</p>
                    </Link>
                </div>
                <div className='option'>
                    <PersonOutlineOutlinedIcon/>
                    <p>Account</p>
                </div>
            </div>
    </div>
  )
}

export default Header