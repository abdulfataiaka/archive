import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import '../../../public/css/catalog/search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchGo = this.searchGo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.viewAll = this.viewAll.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      error: false,
    };
  }
  componentWillMount() {
    this.setState({
      error: false,
    });
  }
  onChange(e) {
    this.props.setQuery(e.target.value);
  }
  onFocus() {
    this.setState({
      error: false,
    });
  }
  viewAll() {
    this.props.setQuery('');
    this.props.reload();
  }
  searchGo(e) {
    e.preventDefault();
    const query = this.props.getQuery();
    if (
      typeof query !== 'string'
      || query.length <= 0
    ) {
      this.setState({
        error: true,
      });
    } else {
      this.props.search(query);
    }
  }
  render() {
    const { error } = this.state;
    return (
      <div id="search-section">
        <div className="page-align">
          <div id="catalog-search">
            <div className="row">
              <div className="col-md-9 col-lg-7">
                <form>
                  <div
                    id="catalog-search-container"
                    style={
                      error
                        ? { borderColor: '#FF9494' }
                        : { borderColor: '#e8e8e8' }
                    }
                  >
                    <input
                      type="text"
                      className="float-left"
                      onFocus={this.onFocus}
                      onChange={this.onChange}
                      value={this.props.getQuery()}
                      placeholder="Search by for recipes title ..."
                    />
                    <button
                      type="submit"
                      onClick={this.searchGo}
                      className="float-right"
                    >
                      <i className="fa fa-search" />
                    </button>
                    <div className="clear" />
                  </div>
                </form>
              </div>
              <div className="col-12 col-md-2">
                <button
                  onClick={this.viewAll}
                  className="green-button catalog-all-button"
                >
                  <i className="fa fa-refresh mr-2" />
                  Reload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
