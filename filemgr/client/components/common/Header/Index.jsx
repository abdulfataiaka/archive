import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAuthViewType } from '../../../actions/auth';
import View from './View';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  setView = (event, viewType) => {
    event.preventDefault();
    this.props.setAuthViewType(viewType);
  }
  
  render() {
    const { viewType } = this.props;

    return (
      <View
        viewType={viewType}
        setView={this.setView}
      />
    );
  }
}

Header.propTypes = {
  viewType: PropTypes.number.isRequired
}

const mapDispatchToProps = {setAuthViewType}

const mapStateToProps = state => ({
  viewType: state.auth.viewType
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
