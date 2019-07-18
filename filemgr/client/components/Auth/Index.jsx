import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import View from './View';

const defaultState = {
  email: '',
  password: '',
  loading: false
}

export class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState }
  }

  componentWillReceiveProps(nextProps) {
    const { viewType } = this.props;
    const { viewType: newViewType } = nextProps;

    if (viewType !== newViewType) {
      this.setState({ ...defaultState });
    }
  }

  onChange = (event) => {
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState(({ loading }) => ({ loading: !loading }));
  }

  render() {
    const { viewType, error } = this.props;
    const { loading, email, password } = this.state;
    const view = viewType == 1 ? 'Sign In' : 'Sign Up';

    return (
      <View
        view={view}
        error={error}
        email={email}
        password={password}
        loading={loading}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

Auth.propTypes = {
  viewType: PropTypes.number.isRequired,
  error: PropTypes.any
}

const mapDispatchToProps = {}

const mapStateToProps = ({ auth }) => ({
  viewType: auth.viewType,
  error: auth.error
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
