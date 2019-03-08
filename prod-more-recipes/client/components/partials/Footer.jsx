import React from 'react';

import '../../../public/css/partials/footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div id="top-section">
          <div id="footer-socials">
            <span className="footer-social">
              <i className="fa fa-facebook" />
            </span>
            <span className="footer-social">
              <i className="fa fa-linkedin" />
            </span>
            <span className="footer-social">
              <i className="fa fa-twitter" />
            </span>
            <span className="footer-social">
              <i className="fa fa-instagram" />
            </span>
          </div>
          <p id="footer-base-text-1">
                HEALTY LEAVING WITH SOFT STOMACH AND GOOD RECIPED FOOD THAT CHANGES
          </p>
          <p id="footer-base-text-2">
                &copy;COPYRIGHTS MORE - RECIPES . 2017 | ABDULFATAI AKA
          </p>
        </div>

      </footer>
    );
  }
}
