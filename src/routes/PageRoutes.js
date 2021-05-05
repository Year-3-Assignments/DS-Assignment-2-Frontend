import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import UserProfilePage from '../pages/user-profile/userPrfilePage';
import SignUpPage from '../pages/signUp/signUpPage';

export default class PageRoutes extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Router>
          <section className="" style={{marginTop: '50px'}}>
            <Switch>
              <Route path="/signup" component={SignUpPage} exact />
              <Route path="/me" component={UserProfilePage} exact />
            </Switch>
          </section>
        </Router>
      </div>
    )
  }
}