import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import '../Shop/Shop.css';

const Review = () => {

    const [cart, setCart] = useState([]);

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() =>{
            const savedCart = getDatabaseCart();
            const productKeys = Object.keys(savedCart);
            
            const cartProduct = productKeys.map(key => {
                const product = fakeData.find(pd => pd.key === key)
                product.quantity = savedCart[key];
                return product;
            })
            setCart(cartProduct);
    } , [])

    return (
        <div className='shop-container'>
            <div className='product-container'>        
                <h1>Cart Items: {cart.length}</h1>
                {
                    cart.map(pd => <ReviewItems removeProduct={removeProduct} product={pd}></ReviewItems>)
                }
            </div>
            <div className='cart'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;