import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review';

export class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { reviews } = this.props;
    return (
      <div>
        <div className="box">
          {
            Array.isArray(reviews) && reviews.length > 0
              ? reviews.map((item, index) => {
                const key = `item${index}`;
                return <Review key={key} comment={item.comment} user={item.User} />;
              })
              : <div className="box-align view-no-item">There are no reviews for recipe</div>
          }
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { recipe } = state.recipe;
  return {
    reviews: recipe.Reviews,
  };
};

export default connect(mapStateToProps, null)(Reviews);

