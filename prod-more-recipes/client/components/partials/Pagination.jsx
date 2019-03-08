import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export class Pagination extends Component {
  constructor(props) {
    super(props);
    this.paginate = this.paginate.bind(this);
    this.parseProps = this.parseProps.bind(this);
    this.isPageNo = (pageNo) => {
      const storePageNo = pageNo;
      const editPageNo = parseInt(pageNo, 10);
      return storePageNo === 'next'
        || storePageNo === 'prev'
        || (
          Number.isInteger(editPageNo)
          && editPageNo > 0
        );
    };
  }

  parseProps() {
    const { pages, active } = this.props;
    let pageCount = parseInt(pages, 10);
    let activePage = parseInt(active, 10);
    if (!Number.isInteger(pageCount)) {
      pageCount = 0;
    }
    if (!Number.isInteger(activePage)) {
      activePage = 0;
    }
    return {
      pageCount,
      activePage,
    };
  }
  paginate(elePageNo) {
    const { paginate } = this.props;
    let pageNo = elePageNo;
    if (this.isPageNo(pageNo)) {
      const { activePage, pageCount } = this.parseProps();
      if (pageNo === 'prev') {
        if (activePage > 1) {
          pageNo = activePage - 1;
        } else {
          pageNo = 1;
        }
      } else if (pageNo === 'next') {
        if (activePage < pageCount) {
          pageNo = activePage + 1;
        } else {
          pageNo = pageCount;
        }
      }
      if (typeof paginate === 'function') {
        paginate(pageNo);
      }
    }
  }
  render() {
    const { activePage, pageCount } = this.parseProps();
    return (
      <div
        style={
          pageCount > 1
          ? { display: 'inline-block' }
          : { display: 'none' }
        }
      >
        <ul className="pagination">
          <li className="page-item">
            <button
              disabled={activePage <= 1}
              style={
                activePage <= 1
                  ? { cursor: 'not-allowed' }
                  : { cursor: 'pointer' }
              }
              onClick={() => this.paginate('prev')}
              className="page-link"
            >
              <i className="fa fa-angle-left" />
            </button>
          </li>
          {
            Array.from(Array(pageCount).keys()).map(pageNo => (
              <li
                key={`page-${pageNo}`}
                className="page-item"
              >
                <button
                  onClick={() => this.paginate(pageNo + 1)}
                  style={
                    activePage === (pageNo + 1)
                      ? { background: '#F1F1F1' }
                      : { background: 'white' }
                  }
                  className="page-link"
                >
                  {pageNo + 1}
                </button>
              </li>
            ))
          }
          <li className="page-item">
            <button
              disabled={activePage >= pageCount}
              style={
                activePage >= pageCount
                  ? { cursor: 'not-allowed' }
                  : { cursor: 'pointer' }
              }
              onClick={() => this.paginate('next')}
              className="page-link"
            >
              <i className="fa fa-angle-right" />
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Pagination);
