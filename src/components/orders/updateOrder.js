import React from 'react';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { updateProduct } from '../../actions/productActions';

let formData = {};
const $ = window.$;
const initialState = {
    id: '',
    productName: '',
    quantity: '',
    unitPrice: '',
    description: '',
    itemCode: '',
    imageUrl: '',
    createdAt: '',
    formNotValid: false
};

class UpdateOrder extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    state = initialState;

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        this.setState({
            id: this.props.id,
            itemCode: this.props.itemCode,
            productName: this.props.productName,
            quantity: this.props.quantity,
            unitPrice: this.props.unitPrice,
            description: this.props.description,
            imageUrl: this.props.imageUrl,
            createdAt: this.props.createdAt
        });
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.setProduct !== nextProps.setProduct) {
            this.setState({
                id: nextProps.setProduct.id,
                itemCode: nextProps.setProduct.itemCode,
                productName: nextProps.setProduct.productName,
                quantity: nextProps.setProduct.quantity,
                unitPrice: nextProps.setProduct.unitPrice,
                description: nextProps.setProduct.description,
                imageUrl: nextProps.setProduct.imageUrl,
                createdAt: nextProps.setProduct.createdAt
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
                    id: this.state.id,
                    productName: this.state.productName,
                    unitPrice: this.state.unitPrice,
                    description: this.state.description,
                    quantity: this.state.quantity,
                    shop: {
                        id: this.props.shopDetails.id
                    }
                };

                console.log('DATA TO SEND', product)
                this.props.updateProduct(product);
                NotificationManager.success('User account successfully created', 'Success');
                $("#update-product").modal("toggle");
            } else {
                this.setState({ formNotValid: true }, () => {
                    NotificationManager.warning('Issue with input fields', 'Please check the input fields');
                });
            }
        }
    }

    render() {
        let { productName, quantity, unitPrice, description, imageUrl, itemCode, createdAt } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-product" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Product</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
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
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light btn-sm btn-pill" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-info btn-sm btn-pill" onClick={this.onSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    setProduct: state.productReducer.setProduct,
    shopDetails: state.shopReducer.setSellerShop
});

const mapDispatchToProps = dispatch => ({
    updateProduct: product => {
        dispatch(updateProduct(product));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrder);
