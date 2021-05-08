import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class NotificationManager extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleClose = this.handleClose.bind(this);
    
    this.state = {
      isAlertOpen: false
    }
  }

  componentDidMount() {
    this.setState({ isAlertOpen: this.props.isOpen });
  }

  handleCheck = (e) => {
    this.setState({ isAlertOpen: true });
  }

  handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ isAlertOpen: false });
  }

  render() {
    switch (this.props.type) {
      case 'success':
        return (
          <Snackbar open={this.state.isAlertOpen} autoHideDuration={3000} onClose={this.handleClose} anchorOrigin={{vertical: "top", horizontal: "right"}}>
            <Alert onClose={this.handleClose} severity="success">
              {this.props.message}
            </Alert>
          </Snackbar>
        );
    
      case 'warning':
        return (
          <Snackbar open={this.state.isAlertOpen} autoHideDuration={3000} onClose={this.handleClose} anchorOrigin={{vertical: "top", horizontal: "right"}}>
            <Alert onClose={this.handleClose} severity="warning">
              {this.props.message}
            </Alert>
          </Snackbar>
        );
      
      case 'error':
        return (
          <Snackbar open={this.state.isAlertOpen} autoHideDuration={3000} onClose={this.handleClose} anchorOrigin={{vertical: "top", horizontal: "right"}}>
            <Alert onClose={this.handleClose} severity="error">
              {this.props.message}
            </Alert>
          </Snackbar>
        );
    }
  }
}

export default NotificationManager;