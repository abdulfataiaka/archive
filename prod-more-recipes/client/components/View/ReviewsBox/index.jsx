import React from 'react';

import PostReview from './PostReview';
import Reviews from './Reviews';

import '../../../../public/css/view/reviews.css';

export default ({ loggedIn, user, recipe }) => (
  <div>
    <div className="mt-4 mb-4">
      <div id="reviews-heading" className="float-left">Reviews ({recipe.Reviews.length})</div>
      <div id="reviews-line" className="float-right" />
      <div className="clear" />
    </div>
    {
      loggedIn
        ? <PostReview user={user} recipeId={recipe.id} />
        : null
    }
    <Reviews />
  </div>
);
