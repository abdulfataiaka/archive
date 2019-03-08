import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { setDashboardLoading } from '../../actions/dashboardActions';

import Profile from './Profile';
import Content from './Content';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.setDashboardLoading(true);
  }

  componentWillReceiveProps(nextProps) {
    const {
      loading,
      user,
      loggedIn,
      userReady,
    } = nextProps;
    if (userReady) {
      this.props.setDashboardLoading(false);
    }
    if (!loading && (user === null || loggedIn !== true)) {
      this.props.history.push('/');
    }
  }
  render() {
    return (
      <div style={{ background: '#F4F4F4' }}>
        <div className="section">
          <div className="row">
            <div className="col-md-3 offset-md-1">
              <Profile />
            </div>
            <div className="col-md-7">
              <Content />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, dashboard } = state;
  return {
    loading: dashboard.dashboardLoading,
    user: auth.user,
    loggedIn: auth.loggedIn,
    userReady: dashboard.userReady,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setDashboardLoading,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
