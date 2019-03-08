import React from 'react';
import loaderImage from '../../../public/img/spinner.gif';

const h1IconJsx = faClass => (
  <h1 className="text-center">
    <i className={`fa ${faClass}`} style={{ fontSize: '40px' }} />
  </h1>
);
const loaderJsx = (
  <div className="loader-image-div">
    <img
      src={loaderImage}
      alt=""
      style={{
        display: 'block',
        margin: '0 auto',
        width: '40px',
      }}
    />
  </div>
);

// error: false (load error), true (ok), null (loading)

const LoadError = ({ mode, title, plain }) => {
  let iconJsx = null;
  let titleText = typeof title === 'string' ? title : '';
  switch (mode) {
    case 'error':
      iconJsx = h1IconJsx('fa-exclamation-triangle');
      break;
    case 'loading':
      iconJsx = loaderJsx;
      titleText = titleText.length <= 0 ? 'Loading' : titleText;
      break;
    default:
      iconJsx = h1IconJsx('fa-warning');
      titleText = 'No content to view';
      break;
  }

  return (
    <div className="text-center">
      {plain ? null : iconJsx}
      <h4
        className="text-center mb-3"
        style={{ color: 'gray', fontWeight: '200' }}
      >
        { titleText }
      </h4>
    </div>
  );
};

export default LoadError;
