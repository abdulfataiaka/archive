import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import expect from 'expect';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import factory from '../factory';
import actionTypes from '../../actions/actionTypes';
import mockStore from '../factory/mockStore';

// Import needed components
import ConnectView, { View } from '../../components/View';
import LoadError from '../../components/partials/LoadError';
import Author from '../../components/View/Author';
import ReviewsBox from '../../components/View/ReviewsBox';
import ConnectReviews, { Reviews } from '../../components/View/ReviewsBox/Reviews';
import ConnectPostReview, { PostReview } from '../../components/View/ReviewsBox/PostReview';
import Review from '../../components/View/ReviewsBox/Review';
import Ingredients from '../../components/View/Ingredients';
import ConnectRecipeImage, { RecipeImage } from '../../components/View/RecipeImage';

// Configure enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

const recipe = factory.getMock('recipe');

// Writing test cases for view component
describe('Testing View component before fetching recipe details', () => {
  const viewWrapper = shallow((
    <View
      setRecipeViewStatus={() => {}}
    />
  ));

  it('Should render the view component', (done) => {
    expect(viewWrapper.length).toEqual(1);
    expect(toJson(viewWrapper)).toMatchSnapshot();
    done();
  });

  it('Should render the view component with loadError component', (done) => {
    expect(viewWrapper.find(LoadError).length).toEqual(1);
    expect((
      viewWrapper
        .find(LoadError)
        .prop('title')
        .toLowerCase()
    ))
      .toEqual('ops! unable to load recipe details');
    done();
  });
});

// Writing test cases for view component
describe('Testing View component after fetching recipe details', () => {
  const viewWrapper = shallow((
    <View
      recipe={recipe}
      setRecipeViewStatus={() => {}}
    />
  ));

  it('Should connect component to store', (done) => {
    const auth = factory.getMock('auth');
    const store = mockStore({
      recipe,
      auth,
    });
    const connectViewWrapper = shallow((
      <ConnectView store={store} />
    ));
    done();
  });

  it('Should render without errors', (done) => {
    expect(viewWrapper.length).toEqual(1);
    expect(toJson(viewWrapper)).toMatchSnapshot();
    done();
  });

  it('Should contain the Author component with expected props', (done) => {
    const { username, avatar } = recipe.Owner;
    const AuthorWrapper = shallow((
      <Author
        username={username}
        avatar={avatar}
      />
    ));
    expect(viewWrapper.find(Author).length).toEqual(1);
    expect(viewWrapper.find(Author).props())
      .toEqual({
        username,
        avatar,
      });
    expect(AuthorWrapper.find('div').at(0)
      .hasClass('box mt-3'))
      .toEqual(true);
    expect(AuthorWrapper.find('div').length)
      .toEqual(7);
    done();
  });
});

// Writing test cases for Ingredients component
describe('Testing Ingredients component', () => {
  const ingredientsWrapper = shallow((
    <Ingredients
      ingredients="Pepper, Curri"
    />
  ));
  it('Should have four div tags', (done) => {
    expect(ingredientsWrapper.find('div').length)
      .toEqual(4);
    expect(ingredientsWrapper.find('div').at(0)
      .hasClass('box')).toEqual(true);
    expect(ingredientsWrapper.find('div').at(1)
      .hasClass('box-head')).toEqual(true);
    done();
  });
});

// Writing test cases for reviews box component
describe('Testing ReviewsBox component', () => {
  const viewWrapper = shallow((
    <View
      recipe={recipe}
      setRecipeViewStatus={() => {}}
    />
  ));
  it('Should contain the ReviewsBox component', (done) => {
    expect(viewWrapper.find(ReviewsBox).length).toEqual(1);
    done();
  });

  it('Should render the ReviewsBox component without error', (done) => {
    const props = {
      loggedIn: undefined,
      user: undefined,
      recipe,
    };
    const reviewsBoxWrapper = shallow(<ReviewsBox {...props} />);
    expect(toJson(reviewsBoxWrapper)).toMatchSnapshot();
    expect(reviewsBoxWrapper.find('div').at(0).hasClass(''))
      .toEqual(true);
    expect(reviewsBoxWrapper.find('div').at(1).hasClass('mt-4 mb-4'))
      .toEqual(true);
    done();
  });
});

// Writing test cases for reviews component
describe('Testing Reviews component', () => {
  it('Should render no reviews view', (done) => {
    const reviewsWrapper = shallow(<Reviews reviews={[]} />);
    expect(toJson(reviewsWrapper)).toMatchSnapshot();
    expect(reviewsWrapper.find('div').length).toEqual(3);
    expect(reviewsWrapper.find('div').at(0).hasClass('')).toEqual(true);
    expect(reviewsWrapper.find('div').at(1)
      .hasClass('box'))
      .toEqual(true);
    expect(reviewsWrapper.find('div').at(2)
      .hasClass('box-align view-no-item'))
      .toEqual(true);
    done();
  });

  it('Should render reviews view', (done) => {
    const review = factory.getMock('review');
    const reviews = [
      { ...review },
      { ...review },
      { ...review },
    ];
    recipe.Reviews = [...reviews];
    const store = mockStore({
      recipe: {
        recipe,
      },
    });
    const reviewsWrapper = mount(<Reviews reviews={reviews} />);
    expect(toJson(reviewsWrapper)).toMatchSnapshot();
    expect(reviewsWrapper.find('div').length).toEqual(14);
    expect(reviewsWrapper.find('div').at(0).hasClass('')).toEqual(true);
    expect(reviewsWrapper.find('div').at(1)
      .hasClass('box'))
      .toEqual(true);
    expect(reviewsWrapper.find(Review).length)
      .toEqual(3);
    // To demostrate usage of store test
    const reviewsConnectWrapper = shallow(<ConnectReviews store={store} />);
    done();
  });
});

// Writing test cases for review component
describe('Testing Review component', () => {
  it('Should render without error', (done) => {
    const review = factory.getMock('review');
    const { comment, User: user } = review;
    const props = { comment, user };
    const reviewWrapper = shallow(<Review {...props} />);
    expect(reviewWrapper.find('div').length).toEqual(4);
    expect(reviewWrapper.find('img').length).toEqual(1);
    expect(reviewWrapper.find('p').length).toEqual(1);
    expect(reviewWrapper.find('p').hasClass('review-body')).toEqual(true);
    done();
  });
});

// Writing test cases for postReview component
describe('Testing PostReview component', () => {
  const review = factory.getMock('review');
  const { User: user } = review;
  const props = { user };
  const postReviewWrapper = shallow(<PostReview {...props} />);

  it('Should render without error', (done) => {
    expect(postReviewWrapper.length).toEqual(1);
    done();
  });

  it('Should have ten divs rendered', (done) => {
    expect(postReviewWrapper.find('div').length)
      .toEqual(8);
    done();
  });

  it('Should have top div with class (box mb-3)', (done) => {
    expect(postReviewWrapper.find('div').at(0)
      .hasClass('box mb-3')).toEqual(true);
    done();
  });

  it('Should have other divs with specified classes', (done) => {
    expect(postReviewWrapper.find('div').at(1)
      .hasClass('box-head')).toEqual(true);
    expect(postReviewWrapper.find('div').at(2)
      .prop('id')).toEqual('review-post-div');
    done();
    expect(postReviewWrapper.find('div').at(3)
      .prop('id')).toEqual('review-post-field-div');
    expect(postReviewWrapper.find('img')
      .prop('id')).toEqual('poster-image');
    expect(postReviewWrapper.find('div').at(4)
      .hasClass('clear')).toEqual(true);
    expect(postReviewWrapper.find('div').at(5)
      .hasClass('mt-3')).toEqual(true);
    expect(postReviewWrapper.find('div').at(6)
      .prop('id')).toEqual('post-error');
    expect(postReviewWrapper.find('div').at(7)
      .hasClass('clear')).toEqual(true);
    expect(postReviewWrapper.find('button')
      .hasClass('green-button float-left')).toEqual(true);
    expect(postReviewWrapper.find('button')
      .prop('id')).toEqual('post-button');
    expect(postReviewWrapper.find('textarea')
      .prop('id')).toEqual('post-textarea');
    expect(postReviewWrapper.find('textarea')
      .hasClass('float-left')).toEqual(true);
    done();
  });
});

// Writing test cases for postReview component
describe('Testing PostReview component with connection to store', () => {
  it('Should connect to store', (done) => {
    const store = mockStore({});
    const ConnectpostReviewWrapper = shallow(<ConnectPostReview store={store} />);
    done();
  });
});

// Writing test cases for postReview component
describe('Testing PostReview component', () => {
  const review = factory.getMock('review');
  const { User: user } = review;
  const props = {
    user,
    postReview: () => {},
  };
  const postReviewWrapper = shallow(<PostReview {...props} />);

  it('Should have a state (error=Please enter a comment to post)', (done) => {
    postReviewWrapper.find('button').simulate('click', {
      preventDefault: () => {},
    });
    expect(Object.keys(postReviewWrapper.state())
      .includes('error')).toEqual(true);
    expect(postReviewWrapper.state().error.toLowerCase())
      .toEqual('please enter a comment to post');
    done();
  });

  it('Should set comment in state to empty string', (done) => {
    postReviewWrapper.setState({ comment: 'hello there' });
    expect(Object.keys(postReviewWrapper.state())
      .includes('comment')).toEqual(true);
    expect(postReviewWrapper.state().comment.toLowerCase())
      .toEqual('hello there');
    postReviewWrapper.find('button').simulate('click', {
      preventDefault: () => {},
    });
    expect(Object.keys(postReviewWrapper.state())
      .includes('comment')).toEqual(true);
    expect(postReviewWrapper.state().comment.toLowerCase())
      .toEqual('');
    done();
    done();
  });

  it('Should trigger textarea change', (done) => {
    postReviewWrapper.find('textarea').simulate('change', {
      preventDefault: () => {},
      target: {
        name: 'comment',
        value: 'sddsdois',
      },
    });
    done();
  });
});

// Writing test cases for RecipeImage component
describe('Testing RecipeImage component', () => {
  const basicProps = {
    recipe,
    favorites: [],
    toastMessage: () => {},
    user: { token: 'sdfssffs' },
    loggedIn: false,
    downvoteARecipe: () => {},
    setUserVoteForView: () => {},
    upvoteARecipe: () => {},
    addAsFavorite: () => {},
    deleteFavorite: () => {},
  };

  const downvoteSpy = sinon.spy(basicProps, 'downvoteARecipe');
  const upvoteSpy = sinon.spy(basicProps, 'upvoteARecipe');
  const toasterSpy = sinon.spy(basicProps, 'toastMessage');
  const favoriteSpy = sinon.spy(basicProps, 'addAsFavorite');

  it('Should connect to store', (done) => {
    const store = mockStore({
      recipe,
    });
    const connectRecipeImageWrapper = shallow((
      <ConnectRecipeImage
        store={store}
        recipe={recipe}
        favorites={[]}
      />
    ));
    done();
  });

  it('Should call the upvoteARecipe action creator', (done) => {
    const recipeImageWrapper = shallow((
      <RecipeImage
        {...basicProps}
        loggedIn
      />
    ));
    const thumbsUpBut = (
      recipeImageWrapper.find('button').at(0)
    );
    thumbsUpBut.simulate('click');
    expect(upvoteSpy.called).toEqual(true);
    done();
  });

  it('Should call the toastMessage action creator', (done) => {
    const recipeImageWrapper = shallow((
      <RecipeImage
        {...basicProps}
      />
    ));
    const thumbsUpBut = (
      recipeImageWrapper.find('button').at(0)
    );
    thumbsUpBut.simulate('click');
    expect(toasterSpy.called).toEqual(true);
    done();
  });

  it('Should call the downARecipe action creator', (done) => {
    const recipeImageWrapper = shallow((
      <RecipeImage
        {...basicProps}
        loggedIn
      />
    ));
    const thumbsDownBut = (
      recipeImageWrapper.find('button').at(1)
    );
    thumbsDownBut.simulate('click');
    expect(downvoteSpy.called).toEqual(true);
    done();
  });

  it('Should call the addAsFavorite action creator', (done) => {
    const recipeImageWrapper = shallow((
      <RecipeImage
        {...basicProps}
        loggedIn
      />
    ));
    const favoriteBut = (
      recipeImageWrapper.find('button').at(2)
    );
    favoriteBut.simulate('click');
    expect(favoriteSpy.called).toEqual(true);
    done();
  });
});
