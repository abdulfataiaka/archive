import React from 'react';
import { Link } from 'react-router-dom';

const App = ({ }) => (
  <div style={{ marginTop: '50px', textAlign: 'center' }}>
    <p>Welocme to actual application</p>

    <div>
      <Link to="/updates">Redux Updates</Link> 
    </div>
  </div>
);

export default App;
