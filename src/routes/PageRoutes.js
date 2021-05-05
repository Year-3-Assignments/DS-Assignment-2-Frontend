import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import SellerProfilePage from '../pages/user-profile/userPrfilePage';
import SignUp from '../pages/signup/signUpPage';

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
            </Switch>
          </section>
        </Router>
      </div>
    )
  }
}