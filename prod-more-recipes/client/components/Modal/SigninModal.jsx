import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { hideModal } from '../../actions/modalActions';
import {
  loginUser,
  setAuthError,
} from '../../actions/userActions';
import '../../../public/css/modals/auth.css';

class SigninModal extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.defaultMesg = 'Provide required information';
    this.state = {
      username: '',
      password: '',
    };
    this.oldUsername = '';
  }
  componentWillReceiveProps() {
    if (this.props.status !== false) {
      this.setState({
        password: '',
      });
    }
  }
  componentWillUnmount() {
    this.props.setAuthError(null);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onFocus() {
    this.props.setAuthError(null);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state);
  }
  render() {
    let { error } = this.props;
    let modalErrorClass = null;
    if (error !== null) {
      modalErrorClass = 'su-error-failed';
    } else { error = this.defaultMesg; }
    return (
      <div className="main-whitebox">
        <h4 className="su-heading">
          <i className="su-icon fa fa-coffee" />
          Login to your account
          <button
            onClick={this.props.hideModal}
            className="float-right modal-xbut"
            style={{ marginTop: '-1px' }}
            type="button"
          >
            <i className="fa fa-times" />
          </button>
          <div className="clear" />
        </h4>
        <h6 className="su-heading-small">
          For accessibility to you recipe ideas
        </h6>
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.onSubmit}>
              <div className={`su-error${modalErrorClass !== null ? ` ${modalErrorClass}` : ''}`}>
                {error}
              </div>
              <div className="form-group">
                <span className="su-label">USERNAME</span>
                <input
                  autoComplete="true"
                  onFocus={this.onFocus}
                  onChange={this.onChange}
                  className="su-field"
                  type="text"
                  name="username"
                />
              </div>
              <div className="form-group">
                <span className="su-label">PASSWORD</span>
                <input
                  className="su-field"
                  autoComplete="true"
                  type="password"
                  onFocus={this.onFocus}
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                />
              </div>
              <button type="submit" className="su-button">LOGIN</button>
              <Link to="/" href="/">
                <span className="" id="signin-forgot">FORGOT PASSWORD ?</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ error: state.auth.authError });

const mapDispatchToProps = dispatch => bindActionCreators({
  hideModal,
  loginUser,
  setAuthError,
}, dispatch);

SigninModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(SigninModal);
