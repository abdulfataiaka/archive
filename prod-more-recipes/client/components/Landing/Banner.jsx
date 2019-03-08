import React from 'react';

import '../../../public/css/home/banner.css';
/**
 *
 * @export
 * @class Banner
 * @extends {React.Component}
 */
const Banner = () => (
  <section id="banner" className="hidden-md-down">
    <div className="overlay" id="banner-overlay" />
    <div className="overlay-top">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="text-center" id="banner-heading-1">MORE</div>
          <div className="text-center" id="banner-heading-2">RECIPES</div>
          <p className="text-center" id="banner-heading-3">
            PRESENTING A PLATFORM FOR SHARING YOUR RECIPE IDEAS
          </p>
        </div>
      </div>
    </div>
    <video style={{ marginTop: '-60px' }} id="sampleMovie" width="100%" height="100%" autoPlay loop>
      <track kind="captions" />
      <source src="http://res.cloudinary.com/abdulfatai/video/upload/v1517225650/banner_kfb2sl.webm" type="video/webm" />
    </video>
  </section>
);

export default Banner;
