import React from 'react';
import landingImage from '../../assets/landing.png';
import './landingPage.css';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-6 col-sm-12">
          <div className="landing-wrapper">
            <h1 className="landing-title">Welcome to ShopaFy</h1>
            <h4 className="text-muted mb-4">Where you can buy and sell anything that you want...</h4>
            <button className="btn btn-dark btn-pill btn-lg landing-btn" onClick={e => window.location = "/signup"}>
              SIGN UP TODAY&nbsp;&nbsp;
              <i class="fas fa-hand-point-right fa-lg"></i>
            </button>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <img src={landingImage} className="landing-img" alt="landing-image" />
        </div>
      </div>
    )
  }
}

export default LandingPage;