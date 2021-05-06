import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import ProductsPage from '../pages/products/ProductsPage';
import SellerProfilePage from '../pages/seller-profile/sellerPrfilePage';
import SignUp from '../pages/SignUp/SignUpPage';

export default class PageRoutes extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Router>
          <section className="mt-5">
            <Switch>
              <Route path="/signup" component={SignUp} exact />
              <Route path="/me" component={SellerProfilePage} exact />
              <Route path="" component={ProductsPage} exact />
            </Switch>
          </section>
        </Router>
      </div>
    )
  }
}