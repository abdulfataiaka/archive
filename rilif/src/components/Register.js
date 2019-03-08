import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../utilities';
import Header from './Header';

class Register extends Component {

  componentWillMount () {
    const user = getUser();
    if (!user) this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Header />
        <div className="row mt-5">
          <div className="col-4 offset-4">

            <Link to="/sponsor">
              <div className="continue mt-5" style={{ background: '#5c58ca'} }>
                <span className="icon">
                  <i className="fa fa-sign-in"></i>
                </span>
                <span className="text">
                  Continue as a Sponsor
                </span>
              </div>
            </Link>
            
            <Link to="/">
              <div className="continue mt-4" style={{ background: '#34354f'} }>
                <span className="icon">
                  <i className="fa fa-sign-in"></i>
                </span>
                <span className="text">
                  Continue as NGO
                </span>
              </div>
            </Link>

            <Link to="/">
              <div className="continue mt-4" style={{ background: '#eea7a5'} }>
                <span className="icon">
                  <i className="fa fa-sign-in"></i>
                </span>
                <span className="text">
                  Continue as an Institution
                </span>
              </div>
            </Link>

            <Link to="/">
              <div className="continue mt-4" style={{ background: '#0084bf'} }>
                <span className="icon">
                  <i className="fa fa-sign-in"></i>
                </span>
                <span className="text">
                  Continue as a Regulatory Body
                </span>
              </div>
            </Link>

          </div>
        </div>
      </div>
    );
  }
}

export default Register;
