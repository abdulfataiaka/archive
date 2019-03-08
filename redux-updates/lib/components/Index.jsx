import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../helpers/props';
import View from './View';

class ReduxUpdates extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {} = this.props;

    return (
      <View />
    );
  }
}

export default connect(mapStateToProps, null)(ReduxUpdates);
