import React, { useState } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import * as firebase from "firebase/app";
import firebaseConfig from './../../firebase.config';
import "firebase/auth";

firebase.initializeApp(firebaseConfig);

const Header = () => {
    const[newUser,setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        photo:''
    })
    const provider = new firebase.auth.GoogleAuthProvider();
    // Sign In
    const signUpHandler = () => {
        firebase.auth().signInWithPopup(provider)
        .then(res => {
            const {displayName, photoURL, email} = res.user;
            const signInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(signInUser)
        }).catch(err => alert(err))
    }
    // SignOut
    const signOutHandler = () => {
        firebase.auth().signOut()
        .then(res => {
            const signoutUser = {
                isSignIn: false,
                name: '',
                email: '',
                photo: '',
                password: '',
                error: '',
                success: false
            }
            setUser(signoutUser)
        }).catch(err => alert(err))
    }
    
// form handler

    const blurHandler = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email' ){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if(e.target.name === 'password' ){
            const isPassValid = e.target.value.length > 6;
            const hasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = hasNumber && isPassValid;
        }
        if (isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const submitHandler = (e) => {
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
               const newUserInfo = {...user};
               newUserInfo.error = '';
               newUserInfo.success = true;
               setUser(newUserInfo);
               updateUser(user.name);       
            })
            .catch(error => {
                // Handle Errors here.
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
                // ...
              });
        }
       if( !newUser && user.email && user.password ){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);       
             })
             .catch(error => {
                 // Handle Errors here.
                 const newUserInfo = {...user};
                 newUserInfo.error = error.message;
                 newUserInfo.success = false;
                 setUser(newUserInfo);
                 // ...
             });
       }
       e.preventDefault();
       
    }

    const updateUser = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name,
        }).then(function() {
        // Update successful.
        alert('successfully logged in'); 
        }).catch(function(error) {
        // An error happened.
        console.log(error);

        });
    } 

    return (
        <div className='header'>
            <img src={logo} height='90px' alt=''/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory</a>
                
            </nav>
                {
                    user.isSignIn ? <button onClick={signOutHandler} className="sign-up">Sign Out</button> : 
                    <button onClick={signUpHandler} className="sign-up">Sign Up</button>
                }
                
                {
                    user.isSignIn && <div>
                            <img src={user.photo} width='50px' alt=""/>
                            <p>{user.name}</p> 
                        </div>
                }
                
                <br/><input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id=""/>
                <label htmlFor="newUser">User Sign Up</label>
                <form onSubmit={submitHandler}>
                    {
                      newUser && <input type="text" name="name" placeholder='Name' onBlur={blurHandler} id=""/>
                    } 
                    <br/><input type="email" name="email" onBlur={blurHandler} placeholder='email' id=""/><br/>
                    <input type="password" name="password" onBlur={blurHandler} placeholder='password' id=""/><br/>
                    <input type="button" onClick={submitHandler} value="Submit"/>
                </form> 
                {
                    user.success ? <p style={{color:'green'}}>User {!newUser ? 'Logged In' : 'Created'} Successfully</p> : 
                    <p style={{color:'red'}}>{user.error}</p> 
                }
                
                
        </div>
    );
};

export default Header;