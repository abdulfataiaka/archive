import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../../public/css/partials/recipe.css';
import GeneralCtrl from './GeneralCtrl';
import MyRecipeCtrl from './MyRecipeCtrl';
import FavoritesCtrl from './FavoritesCtrl';

export class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.getOverlayComponent = this.getOverlayComponent.bind(this);

    this.overEnter = this.overEnter.bind(this);
    this.overExit = this.overExit.bind(this);

    this.getClassSet = this.getClassSet.bind(this);

    this.state = {
      showOver: false,
    };
  }

  getClassSet() {
    let { classSet } = this.props;
    classSet = parseInt(classSet, 10);
    classSet = Number.isInteger(classSet) && classSet > 0 ? classSet : 1;
    if (classSet === 1) {
      return 'col-12 col-sm-6 col-md-4';
    } else if (classSet === 2) {
      return 'col-12 col-sm-6 col-md-4 col-lg-3';
    } else if (classSet === 3) {
      return 'col-12 col-sm-6';
    }
    return 'col-6';
  }

  getOverlayComponent() {
    const {
      controlSet,
      favoriteId,
      recipe,
      categorized,
    } = this.props;
    if (controlSet === 1) {
      return <GeneralCtrl recipe={recipe} />;
    } else if (controlSet === 2) {
      return <MyRecipeCtrl recipe={recipe} />;
    } else if (controlSet === 3) {
      return (
        <FavoritesCtrl
          categorized={categorized}
          favoriteId={favoriteId}
          recipe={recipe}
        />
      );
    }
    return null;
  }

  overEnter() {
    this.setState({ showOver: true });
  }

  overExit() {
    this.setState({ showOver: false });
  }

  render() {
    const { image, title } = this.props.recipe;
    const { lengthy } = this.props;
    return (
      <div className={this.getClassSet()}>
        <div className="recipe-div-container">
          <div
            className={`recipe-div${lengthy ? ' recipe-divB' : ''}`.trim()}
            onMouseEnter={this.overEnter}
            onMouseOver={this.overEnter}
            onFocus={this.overEnter}
            onMouseLeave={this.overExit}
          >
            <div style={this.state.showOver ? { display: 'block' } : { display: 'none' }}>
              <div className="overlay" />
              <div className="overlay-top">
                {this.getOverlayComponent()}
              </div>
            </div>
            {/* Render Image */}
            {
              typeof image === 'string' && image.length > 0
                ? <img src={image} className="bg-img" alt="" />
                : (
                  <div className="default-recipe-img">
                    <span className="fa fa-coffee" />
                  </div>
                )
            }
          </div>
          <div className="recipe-title">
            {title}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { auth, favorites } = state;
  return {
    user: auth.user,
    loggedIn: auth.loggedIn,
    favorites,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
