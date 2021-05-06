import React from 'react';
import { connect } from 'react-redux';
import { getAllProducts } from '../../actions/productActions';
import Products from './products';
import Pagination from '../../components/pagination/pagination';

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false,
      currentPage: 1,
      itemsPerPage: 24
    }
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.allProducts !== nextProps.allProducts) {
      this.setState({ products: nextProps.allProducts });
    }
  }

  render() {
    let { products, currentPage, itemsPerPage } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber })

    return (
      <div className="container">
        <Products products={currentItems} />
        <Pagination totalItems={products.length} itemsPerPage={itemsPerPage} paginate={paginate} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.productReducer.getAllProducts
});

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => {
    dispatch(getAllProducts());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);