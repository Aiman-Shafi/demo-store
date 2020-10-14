import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Error from './components/Error 404/Error'
import SingleProduct from './components/SingleProduct/SingleProduct';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})

  return (

    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
        <Header></Header>
          <Switch>
            <Route path='/shop'>
              <Shop></Shop>
            </Route>
            <Route path='/review'>
              <Review></Review>
            </Route>
            <PrivateRoute path='/inventory'>
              <Inventory></Inventory>
            </PrivateRoute>
            <PrivateRoute path='/shipment'>
              <Shipment></Shipment>
            </PrivateRoute>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <Route exact path='/'>
              <Shop></Shop>
            </Route>
            <Route path='/product/:productKey'>
              <SingleProduct></SingleProduct>
            </Route>
            <Route path='*'>
              <Error></Error>
            </Route>
            
          </Switch>      
        </Router>
        
    </UserContext.Provider>
  );
}

export default App;
