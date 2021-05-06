import React from 'react';
import BuyerProduct from '../../components/products/BuyerProduct';


class ProductsPage extends React.Component  {

 render() {
    return (
        <div>
          <BuyerProduct/>
          <br></br> <br></br> <br></br> <br></br>
            <div className="d-flex justify-content-end text-right mt-2 ">
                <nav className="paging">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                        <li className="page-item"><a className="page-link" href="#">5</a></li>
                        <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                    </ul>
                </nav>
            </div>
        </div>
   
    )
}
}


export default ProductsPage;