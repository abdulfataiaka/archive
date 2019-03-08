import React from 'react';
import { connect } from 'react-redux';

import Banner from './Banner';
import Popular from './Popular';

const Home = ({ user, favorites }) => (
  <div>
    <Banner />
    <Popular favorites={favorites} user={user} />
  </div>
);

const mapStateToProps = (state) => {
  const { user, favorites } = state;
  return {
    favorites,
    user,
  };
};
export default connect(mapStateToProps, null)(Home);
