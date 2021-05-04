import React from 'react';
import Progress from '../Progress/Progress';
import firebase from '../../firebase.config';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { NotificationManager } from 'react-notifications';
import { createNewProduct } from '../../actions/productActions';
import { getSellerShops } from '../../actions/shopAcions';

const initialState = {
  productName: '',
  unitPrice: '',
  description: '',
  quantity: '',
  profileImage: null,
  imageUrl: '',
  uploadPercentage: 0,
  formNotValid: false
};

let formData = {};

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.setUploadPercentage = this.setUploadPercentage.bind(this);
    this.setImageUrl = this.setImageUrl.bind(this);
    this.setImage = this.setImage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  state = initialState;
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setImage = (e) => {
    this.setState({ profileImage: e.target.files[0] });
  }

  setUploadPercentage = (progress) => {
    this.setState({ uploadPercentage: progress });
  }

  setImageUrl = ({imageUrl}) => {
    this.setState({ imageUrl: imageUrl }, () => {
      console.log('image url', this.state.imageUrl)
    });
  }

  uploadImage =(e) => {
    e.preventDefault();
    if (this.state.profileImage !== null) {
      let imageCode = uuidv4();
      let folderName = 'Product-Images';
      let file = this.state.profileImage;
      let upload = firebase.storage().ref(`${folderName}/${imageCode}`).put(file);

      upload.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setUploadPercentage(progress);
      }, (error) => {
        console.log(error);
      }, () => {
        upload.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          this.setImageUrl({ imageUrl: url });
        });
      });
    }
  }

  validateForm() {
    const data = {
      productname: this.state.productName && this.state.productName.trim().length > 0 ? this.state.productName : null,
      unitprice: this.state.unitPrice && this.state.unitPrice.toString().trim().length > 0 ? this.state.unitPrice : null,
      quantity: this.state.quantity && this.state.quantity.toString().trim().length > 0 ? this.state.quantity : null,
      description: this.state.description && this.state.description.trim().length > 0 ? this.state.description : null,
      imageurl: this.state.imageUrl && this.state.imageUrl.trim().length > 0 ? this.state.imageUrl : null,
    };

    formData = Object.assign({}, data);
    return true;
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let data = Object.values(formData).map(key => {
        return key !== null;
      });

      if (!data.includes(false)) {
        let product = {
          productName: this.state.productName,
          unitPrice: this.state.unitPrice,
          quantity: this.state.quantity,
          description: this.state.description,
          imageUrl: this.state.imageUrl,
          shop: {
            id: this.props.shop.id
          }
        }
        console.log('product', product)
        this.props.createNewProduct(product);
        this.state = initialState;
        NotificationManager.success('User account successfully created', 'Success')
      } else {
        this.setState({ formNotValid: true }, () => {
          NotificationManager.warning('Issue with input fields', 'Please check the input fields');
        });
      }
    }
  }

  render() {
    let { productName, unitPrice, quantity, description, imageUrl } = this.state;

    return (
      <div className="mt-4">
        <div className="border p-3">
          <form>
            <h5>Add a New Product</h5>
            <div className="row m-0 mb-3">
              <label htmlFor="product-name" className="form-label p-0 create-shop">Product Name</label>
              <input type="text" id="product-name" className="form-control" name="productName" value={productName} onChange={this.onChange} />
              {formData.productname===null && this.state.formNotValid ? <span className="form__help_danger p-0">Product name is required</span> : null}
            </div>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="unit-price" className="form-label p-0 create-shop">Unit Price</label>
                <input type="number" id="unit-price" className="form-control" name="unitPrice" value={unitPrice} onChange={this.onChange} />
                {formData.unitprice===null && this.state.formNotValid ? <span className="form__help_danger">Unit price is required</span> : null}
              </div>
              <div className="col">
                <label htmlFor="quantity" className="form-label p-0 create-shop">Stock Quantity</label>
                <input type="number" id="quantity" className="form-control" name="quantity" value={quantity} onChange={this.onChange} />
                {formData.quantity===null && this.state.formNotValid ? <span className="form__help_danger">Quantity is required</span> : null}
              </div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea className="form-control text-area" style={{height: '100px'}} name="description" value={description} onChange={this.onChange} id="description"></textarea>
              {formData.description===null && this.state.formNotValid ? <span className="form__help_danger">Description is required</span> : null}
            </div>

            <div className="mb-3">
              <label htmlFor="product-image" className="form-label">Product Image</label>
              <div className="input-group">
                <input type="file" className="form-control" id="product-image" onChange={e => this.setImage(e)} />
                <button className="btn btn-outline-primary btn-sm" type="button" onClick={this.uploadImage}>UPLOAD</button>
              </div>
              {formData.imageurl===null && this.state.formNotValid ? <span className="form__help_danger">Product image is required</span> : null}
            </div>

            <div className="mb-3">
              <Progress percentage={this.state.uploadPercentage} />
            </div>

            <div className="d-flex justify-content-end">
              <a href="#" className="btn btn-info btn-sm btn-pill" onClick={this.onSubmit}>ADD PRODUCT</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shop: state.shopReducer.setSellerShop,
  newProduct: state.productReducer.createProduct,
});

const mapDispatchToProps = dispatch => ({
  createNewProduct: product => {
    dispatch(createNewProduct(product));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);