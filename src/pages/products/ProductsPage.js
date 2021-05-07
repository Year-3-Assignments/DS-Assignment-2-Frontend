import React from 'react';
import { connect } from 'react-redux';
import { getAllProducts } from '../../actions/productActions';
import Products from './products';
import Pagination from '../../components/pagination/pagination';
import LandingPage from '../landing/landingPage';

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false,
      currentPage: 1,
      itemsPerPage: 24,
      isPageLoading: true
    }
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.allProducts !== nextProps.allProducts) {
      this.setState({ 
        products: nextProps.allProducts,
        isPageLoading: nextProps.isLoading
      });
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
        <LandingPage/>
        {!this.state.isPageLoading ? 
          <div>
            <Products products={currentItems} />
            <Pagination totalItems={products.length} itemsPerPage={itemsPerPage} paginate={paginate} />
          </div>
        :
          <div class="text-center page-loading">
            <div className="align-text-bottom">
              <div class="spinner-border" role="status" style={{width: '5rem', height: '5rem'}}>
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.productReducer.getAllProducts,
  isLoading: state.productReducer.loading
});

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => {
    dispatch(getAllProducts());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);