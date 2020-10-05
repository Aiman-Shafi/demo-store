import React from 'react';
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

function App() {
  return (

    <div className="App">
      <Header></Header>
        <Router>
          <Switch>
            <Route path='/shop'>
              <Shop></Shop>
            </Route>
            <Route path='/review'>
              <Review></Review>
            </Route>
            <Route path='/inventory'>
              <Inventory></Inventory>
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
        
    </div>
  );
}

export default App;
