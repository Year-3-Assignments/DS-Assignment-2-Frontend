import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import SellerProfilePage from '../pages/user-profile/userPrfilePage';
import SignUp from '../pages/SignUp/SignUpPage'
import LoginPage from '../pages/login/LoginPage';
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
              <Route path="/login" component={LoginPage}/>
            </Switch>
          </section>
        </Router>
      </div>
    )
  }
}