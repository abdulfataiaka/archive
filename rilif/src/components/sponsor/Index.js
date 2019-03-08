import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/Dashboard.css';
import userImage from '../../images/user.jpg';
import GirlCard from '../GirlCard';
import GirlThumb from '../GirlThumb';
import Header from '../Header';

class Index extends Component {
  render () {
    return (
      <div id="dashboard" className="clearfix">
        <div id="sidebar" className="pull-left">
          <Header />
          <img alt="" src={userImage} className="user-image" />
          <div class="user-name">John Doe</div>

          <div className="mt-5">
            <div className="sidebar-item">
              <span className="sidebar-title">Wallet Balance</span>
              <span className="sidebar-value">2000 eth / $20,000</span>
            </div>

            <div className="sidebar-item mt-4">
              <span className="sidebar-title">Total Amount Spent</span>
              <span className="sidebar-value">2000 eth / $20,000</span>
            </div>

            <div className="sidebar-item mt-4">
              <span className="sidebar-title">Total Girls Sponsored</span>
              <span className="sidebar-value">5</span>
            </div>

            <button type="button" className="buy-eth">
              <i className="fa fa-money mr-2"></i>
              Buy Eth with local currency
            </button>

            <div className="sidebar-item mt-5">
              <span className="sidebar-title">
                Address <button type="button" className="ml-2 address-copy">Copy</button>
              </span>
              <div className="sidebar-value">20xy2497yfefjhfsiugsfufs78ryuhbfefsyfsfs83</div>
            </div>

          </div>
        </div>
        <div id="content" className="pull-left">
          <div className="row">
            <div class="col-7">
              <h3 className="mb-5">Girls you are sponsoring</h3>
              <GirlCard
                name="Ade Popoola"
                institute="University of Lagos"
                amount="2000 Eth / $20,000"
              />

              <GirlCard
                name="Hannah Rosse"
                institute="University of Lagos"
                amount="2000 Eth / $20,000"
              />

              <GirlCard
                name="Judith Benedict"
                institute="University of Lagos"
                amount="2000 Eth / $20,000"
              />

              <GirlCard
                name="Jane doe"
                institute="University of Lagos"
                amount="2000 Eth / $20,000"
              />
            </div>
            <div class="col-4 offset-1">
              <h4 className="mb-2">Suggestion of girls in need</h4>
              <p className="mb-4">
                We bring forward to you girls that are in
              </p>

               <button type="button" className="buy-eth mb-3" style={{
                 margin: '0',
                 width: '80%',
                 background: 'gray',
                 color: 'white'
                }}>
                <i className="fa fa-eye mr-2"></i>
                See All
              </button>

              <GirlThumb name="Anabella Oroshimaru" />
              <GirlThumb name="Anabella Oroshimaru" />
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
