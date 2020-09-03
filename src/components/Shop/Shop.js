import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    
    const numProducts = fakeData.slice(0,10);
    const [product, setProduct] = useState(numProducts);
    const [cart, setCart] = useState([]);
    const addtoCart = (addProuct) => {
    //const key = product.key;
    //const findPrd = fakeData.find(pd => pd.key !== key);   
    //    console.log('added', addProduct);
        const newCart = [...cart, product];
        setCart(newCart);
    //    console.log(cart);

    }
    

    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    product.map(allProduct => <Product addtoCart={addtoCart} key={Math.random()} productInfo={allProduct}></Product>)
                }
            </div>
            <div className='cart'>
                <Cart cart={cart} />
            </div>
        </div>
    );
};

// Fecthing products
// function ProductContainer(){
//     const numProducts = fakeData.slice(0,10);
//     const [product, setProduct] = useState(numProducts);
//     const [cart, setCart] = useState([]);
//     const addtoCart = (addProduct) => {
//         console.log('added', addProduct);
//         const newCart = [...cart, product];
//         setCart(newCart);
//     }

    
//     return product.map(allProduct => <Product addtoCart={addtoCart} productInfo={allProduct}></Product> )
// }


export default Shop;