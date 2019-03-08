import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import uport from '../uport';
import resolve from 'did-resolver';
import childrenImage from '../images/home-image.jpg';
import cardImageA from '../images/card-1.jpg';
import cardImageB from '../images/card-2.jpg';
import cardImageC from '../images/card-3.jpg';
import Header from './Header';

import { getUser, storeCredentials } from '../utilities';

class Index extends Component {

  constructor (props) {
    super(props);
    this.connectUport = this.connectUport.bind(this);
  }

  connectUport () {
    uport.requestDisclosure();

    uport.onResponse('disclosureReq').then(response => {
      const { payload: { did } } = response;
      resolve(did).then(res => {
        storeCredentials(res.id);
        return this.props.history.push('/register');
      }).catch(e => console.log(e));
    })
  }

  render () {
    return (
      <div>
        <Header />
        <div className="wrapper-restricted" id="home-section">
          <div className="page-aligner">
            <div className="row clearfix" style={{marginTop: '0px' }}>
              <div className="col-7">
                <h1 className="mb-4 mt-5" style={{ fontSize: '60px' }}>Sponsor A Girl Today</h1>
                <p >
                  Rilif is a crowdfunding and fund management platform built on the Ethereum
                  blockchain for delivering aid for humanitarian causes, increasing transparency, trust
                  and reducing cost for all parties involved.
                </p>
                <div>
                  {
                    !getUser() ? (
                      <button onClick={this.connectUport} className="home-button">
                        <i className="fa fa-sign-in mr-2"></i>
                        Continue with uPort
                      </button>
                    ) : (
                      <Link to="/register">
                        <button className="home-button">
                          <i className="fa fa-sign-in mr-2"></i>
                          Proceed
                        </button>
                      </Link>
                    )
                  }
                </div>
              </div>
              <div className="col-5">
                <img alt="" className="float-right home-image" src={childrenImage} />
              </div>
            </div>

            <div className="row mt-5">

              <div className="col-4">
                <div className="card">
                  <img src={cardImageA} alt="" />
                  <div>
                    This is <strong>Baamini Lakshmi</strong>, devastated by the loss her parents with no
                    proper care and guildiance couldn't continue with her education.
                  </div>
                  <button type="button">Sponsor</button>
                </div>
              </div>

              <div className="col-4">
                <div className="card">
                  <img src={cardImageB} alt="" />
                  <div>
                    This is <strong>Chioma Obasi</strong>, devastated by the loss her parents and no
                    proper care and guildiance couldn't continue with her education.
                  </div>
                  <button type="button">Sponsor</button>
                </div>
              </div>

              <div className="col-4">
                <div className="card">
                  <img src={cardImageC} alt="" />
                  <div>
                    This is <strong>Ade Ayotoju</strong>, devastated by the loss her parents and no
                    proper care and guildiance couldn't continue with her education.
                  </div>
                  <button type="button">Sponsor</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
