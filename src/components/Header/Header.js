import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
     
    return (
        <div className='header'>
            
            
            {
                loggedInUser.email ? <div className='top-header'> <h3>email:{loggedInUser.email}</h3>
                <button className='button' onClick={()=> setLoggedInUser({})}>Log Out</button></div> : 
                <div className="top-header">
                <h3>E-mail: Not Logged In</h3>    
                <Link to="/login"><button className='button'>SignUp/Login</button></Link></div>
                
            }
            
            <img src={logo} height='90px' alt=''/>
            <nav>
                
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                
            </nav>
                
        </div>
    );
};

export default Header;