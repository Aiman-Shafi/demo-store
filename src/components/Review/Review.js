import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import PlaceOrder from '../PlaceOrder/PlaceOrder';
import ReviewItems from '../ReviewItems/ReviewItems';
import '../Shop/Shop.css';


const Review = () => {

    const [cart, setCart] = useState([]);
    const [placeOrder, setPlaceOrder] = useState(false);
    const history = useHistory()

    const checkoutHandler = () => {
        history.push('/shipment')
    }

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
                
                {
                    cart.map(pd => <ReviewItems removeProduct={removeProduct} product={pd}></ReviewItems>)
                }
                {   
                    placeOrder && <PlaceOrder></PlaceOrder>                                             
                }
            </div>
            <div className='cart'>
                <Cart cart={cart}>
                    <button onClick={checkoutHandler} className='button'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;