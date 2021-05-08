import React from 'react';
import { connect } from 'react-redux';

class CartItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="border mb-3 shop">
          <div className="">
            <div className="row">
              <div className="col-md-2">
                <img src={this.props.image} alt="product-image" width="120" height="120" />
              </div>
              <div className="col-md-7">
                <h5>{this.props.productName}</h5>
                <h6 className="text-muted"></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);