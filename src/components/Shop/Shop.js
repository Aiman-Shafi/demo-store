import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {
    
        const numProducts = fakeData.slice(0,10);
        const [product, setProduct] = useState(numProducts);
        const [cart, setCart] = useState([]);

        //Savaing data in local database
        useEffect(()=>{
            const savedCart = getDatabaseCart();
            const productKey = Object.keys(savedCart);
            const previousCart = productKey.map(existingKey => {
                const product = fakeData.find(pd => pd.key === existingKey);
                product.quantity = savedCart[existingKey]
                return product
            })
            setCart(previousCart);

        }, [])

        // button handler
        const addtoCart = (addProduct) => {
        const key = addProduct.key;
        const sameProduct = cart.find(pd => pd.key === key)
        let count = 1;
        let cartItems;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== key);
            cartItems = [...others, sameProduct]
        }
        else{
            addProduct.quantity = 1;
            cartItems = [...cart, addProduct]
        } 
        setCart(cartItems);
        addToDatabaseCart(addProduct.key, count)
    }
    

    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    product.map(allProduct => 
                    <Product
                    
                    showAddtoCart = {true} 
                    addtoCart={addtoCart} 
                    key={Math.random()} 
                    productInfo={allProduct}>

                    </Product>)
                }
            </div>
            <div className='cart'>
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className='button'> Review Cart </button>
                    </Link>
                </Cart>    
            </div>
        </div>
    );
};

export default Shop;