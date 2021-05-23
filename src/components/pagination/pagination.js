import React from 'react';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(this.props.totalItems / this.props.itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="d-flex justify-content-center mt-5">
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <a onClick={() => this.props.paginate(number)} href="#" className="page-link">{number}</a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;