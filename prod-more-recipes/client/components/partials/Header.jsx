import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import constants from '../../constants';
import logoImage from '../../../public/img/logo.png';

import '../../../public/css//partials/header.css';
import { logout } from '../../actions/userActions';
import { openModal } from '../../actions/modalActions';
import { toastMessage } from '../../actions/toasterActions';
import modalTypes from '../Modal/modalTypes';

const { DEFAULT_USER_AVATAR_PATH } = constants;

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.showSignupModal = this.showSignupModal.bind(this);
    this.showSigninModal = this.showSigninModal.bind(this);
    this.logout = this.logout.bind(this);
    this.toastUser = this.toastUser.bind(this);
    this.authenticatedJsx = this.authenticatedJsx.bind(this);
    this.unAuthenticatedJsx = this.unAuthenticatedJsx.bind(this);
    this.smNavJsx = this.smNavJsx.bind(this);
    this.toggleMobileNav = this.toggleMobileNav.bind(this);
    this.state = {
      showMobileNav: false,
    };
  }
  toggleMobileNav() {
    this.setState({
      showMobileNav: !this.state.showMobileNav,
    });
  }
  showSignupModal() {
    this.props.openModal(modalTypes.SIGNUP_MODAL);
  }
  showSigninModal() {
    this.props.openModal(modalTypes.SIGNIN_MODAL);
  }

  logout() {
    this.props.logout();
  }

  toastUser() {
    this.props.toastMessage(`You are logged in as ${this.props.user.username}`, 4);
  }

  smNavJsx() {
    return (
      <div
        className="hidden-md-up"
        style={
          this.state.showMobileNav ?
          { display: 'block' } :
          { display: 'none' }
        }
        id="sm-nav"
      >
        <Link to="/" href="/">
          <div className="sm-nav-links">Home</div>
        </Link>
        <Link to="/" href="/">
          <div className="sm-nav-links">DASHBOARD</div>
        </Link>
        <Link to="/" href="/">
          <div className="sm-nav-links">All Recipes</div>
        </Link>
        <Link to="/" href="/">
          <div className="sm-nav-links">Search Recipe</div>
        </Link>
        <Link to="/" href="/">
          <div className="sm-nav-links">LOGIN</div>
        </Link>
        <Link to="/" href="/">
          <div className="sm-nav-links">JOIN FREE</div>
        </Link>
      </div>
    );
  }

  unAuthenticatedJsx() {
    return (
      <div className="float-right">
        <button
          onClick={this.showSigninModal}
          className="float-left header-links"
          type="button"
        >
        Login
        </button>
        <button
          onClick={this.showSignupModal}
          className="float-left header-green-button"
          type="button"
        >
        Join free
        </button>
        <div className="clear" />
      </div>
    );
  }

  authenticatedJsx() {
    const { user, favoritesCount } = this.props;
    return (
      <div className="float-right">
        <Link to="/dashboard" href="/dashboard" title="Goto my dashboard">
          <span className="float-left header-links">Dashboard</span>
        </Link>
        <Link
          to="/dashboard/favorites"
          href="/dashboard/favorites"
          title="View my favorite recipes"
        >
          <span className="float-left header-heart">
            <i className="fa fa-heart float-left" />
            <span className="float-left">{favoritesCount}</span>
            <div className="clear" />
          </span>
        </Link>
        <button onClick={this.toastUser} className="float-left zero-button">
          <img
            src={
              typeof user.avatar === 'string'
              && user.avatar.length > 0
              ? user.avatar
              : DEFAULT_USER_AVATAR_PATH
            }
            alt=""
            className="header-avatar"
          />
        </button>
        <button
          onClick={this.logout}
          className="float-left header-green-button"
          type="button"
        >
        Logout
        </button>
        <div className="clear" />
      </div>
    );
  }

  render() {
    return (
      <div>
        <header>
          <div className="page-align">
            <div className="row">
              <div className="col-10 col-md-5">
                <span id="header-logo">
                  <img src={logoImage} className="float-left" alt="" />
                  <div className="inline-block float-left">
                    <span className="block top">MORE-RECIPES</span>
                    <span className="block base">Platform for sharing your recipe ideas</span>
                  </div>
                  <div className="clear" />
                </span>
              </div>
              <div className="hidden-md-up col-2">
                <button onClick={this.toggleMobileNav} id="header-navbut" className="zero-button">
                  <i className={`fa ${this.state.showMobileNav ? 'fa-times' : 'fa-bars'}`} />
                </button>
              </div>
              <div className="hidden-sm-down col-md-7">

                {
                  this.props.loggedIn !== true
                    ? this.unAuthenticatedJsx()
                    : this.authenticatedJsx()
                }

                <Link to="/catalog" href="/catalog" title="Homepage">
                  <span className="float-right header-icon-B">
                    <i className="fa fa-search" />
                  </span>
                </Link>
                <Link to="/" href="/">
                  <span className="float-right header-icon">
                    <i className="fa fa-home" />
                  </span>
                </Link>

              </div>
            </div>
          </div>
        </header>
        <div id="header-spacer" />

        { this.smNavJsx() }
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  const { auth, favorites } = state;
  return {
    user: auth.user,
    loggedIn: auth.loggedIn,
    favoritesCount: favorites.length,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal,
  logout,
  toastMessage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
