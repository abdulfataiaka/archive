import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { hideToaster } from '../../actions/toasterActions';
import '../../../public/css/partials/toaster.css';

export class Toaster extends React.Component {
  constructor(props) {
    super(props);
    this.hideToastElement = this.hideToastElement.bind(this);
  }
  hideToastElement(e) {
    e.preventDefault();
    this.props.hideToaster();
  }
  render() {
    const { message } = this.props;
    return (
      <button className="zero-button text-left" onClick={this.hideToastElement}>
        <div
          id="toaster-div"
          style={
            typeof message === 'string'
            ?
            { display: 'block' }
            :
            { display: 'none' }
          }
        >
          <div className="message">
            { message }
          </div>
        </div>
      </button>
    );
  }
}
const mapStateToProps = state => state.toaster;
const mapDispatchToProps = dispatch => bindActionCreators({
  hideToaster,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Toaster);
