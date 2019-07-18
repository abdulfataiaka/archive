import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import View from './View';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View />
    );
  }
}

Dashboard.propTypes = {
  
}

const mapDispatchToProps = {

}

const mapStateToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
