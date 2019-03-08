import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  registerUser,
  setAuthError,
} from '../../actions/userActions';
import {
  hideModal,
} from '../../actions/modalActions';
import '../../../public/css/modals/auth.css';

class SignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.defaultMesg = 'Provide required information';
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
    };
  }
  componentWillUnmount() {
    this.props.setAuthError(null);
    this.setState = {
      name: '',
      email: '',
      username: '',
      password: '',
    };
  }
  onFocus() {
    this.props.setAuthError(null);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.registerUser(this.state);
  }
  render() {
    let { error } = this.props;
    let modalErrorClass = null;
    if (error !== null) {
      modalErrorClass = 'su-error-failed';
    } else { error = this.defaultMesg; }
    return (
      <div className="modal-whitebox mwbox-sm">
        <h4 className="su-heading">
          <i className="su-icon fa fa-cutlery" />
            Create an account
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
            To manage and secure your recipe ideas
        </h6>
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.onSubmit}>
              <div className={`su-error${modalErrorClass !== null ? ` ${modalErrorClass}` : ''}`}>
                {error}
              </div>
              <div className="form-group">
                <span className="su-label">NAME</span>
                <input
                  value={this.state.name}
                  name="name"
                  onChange={this.onChange}
                  autoComplete="true"
                  className="su-field"
                  type="text"
                />
              </div>
              <div className="form-group">
                <span className="su-label">USERNAME</span>
                <input
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  autoComplete="true"
                  className="su-field"
                  type="text"
                />
              </div>
              <div className="form-group">
                <span className="su-label">EMAIL</span>
                <input
                  name="email"
                  value={this.state.email}
                  placeholder="enter email if available ..."
                  onChange={this.onChange}
                  autoComplete="true"
                  className="su-field"
                  type="text"
                />
              </div>
              <div className="form-group">
                <span className="su-label">PASSWORD</span>
                <input
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  autoComplete="true"
                  className="su-field"
                  type="password"
                />
              </div>
              <button type="submit" className="float su-button">CREATE ACCOUNT</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ error: state.auth.authError });

const mapDispatchToProps = dispatch => bindActionCreators({
  registerUser,
  setAuthError,
  hideModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);
