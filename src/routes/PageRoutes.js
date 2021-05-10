import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../components/navbar/navBar';
import ProductsPage from '../pages/products/ProductsPage';
import UserProfilePage from '../pages/user-profile/userPrfilePage';
import SignUpPage from '../pages/SignUp/signUpPage';
import SingleProductPage from '../pages/products/singleProductPage';
import LoginPage from '../pages/login/loginPage';

export default class PageRoutes extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Router>
          <section className="" style={{marginTop: '50px'}}>
            <Switch>
              <Route path="/" component={ProductsPage} exact />
              <Route path="/signup" component={SignUpPage} exact />
              <Route path="/login" component={LoginPage} exact />
              <Route path="/me" component={UserProfilePage} exact />
              <Route path="/product/:id" component={SingleProductPage} exact />
            </Switch>
          </section>
        </Router>
      </div>
    )
  }
}
