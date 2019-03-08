import React from 'react';

const Row = ({ version, data }) => (
  <div className="ru-row v1 text">
    <div className="ru-col">
      <span>{ data.reducer }</span>
    </div>

    <div className="ru-col">
      <span className="tag">{ data.actionType }</span>
    </div>

    <div className="ru-col">
      <span className="tag danger">{ data.previous }</span>
      <span className="arrow">=></span>
      <span className="tag success">{ data.newval }</span>
    </div>
  </div>
);

export default Row;
