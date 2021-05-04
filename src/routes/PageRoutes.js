import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SellerProfilePage from '../pages/seller-profile/sellerPrfilePage';
import SignUp from '../pages/signup/signUpPage';

export default class PageRoutes extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <section>
            <Switch>
              <Route path="/signup" component={SignUp} exact />
              <Route path="/me" component={SellerProfilePage} exact />
            </Switch>
          </section>
        </Router>
      </div>
    )
  }
}