import React from 'react';
import './Navbar.css'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <nav className="navbar navbar-light bg-light navbar-expand-sm shopping-nav">
      <a className="navbar-brand" href="#">
      ShopaFy
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbar-list-4">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link"href="#"><i class="fas fa-home"></i>&nbsp;Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i class="fas fa-user-plus"></i>&nbsp;Sign In</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i class="fas fa-shopping-cart"></i>&nbsp;My Cart</a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown dropstart">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="https://firebasestorage.googleapis.com/v0/b/shopping-storage-22f5f.appspot.com/o/Profile-Pictures%2Frusiruavb98?alt=media&token=1dcdf1b0-d8aa-4c94-9dc8-e886898aa67c" width="48" height="48" className="rounded-circle" />
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">MY PROFILE</a>
              <a className="dropdown-item" href="#">LOGOUT</a>
            </ul>
          </li>   
        </ul>
      </div>
    </nav>

  </div>    
        
         
    )
  }
}