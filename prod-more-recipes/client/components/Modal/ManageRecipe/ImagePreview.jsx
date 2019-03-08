import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setManageRecipeStatus,
  setManageRecipeEntry,
} from '../../../actions/recipeActions';

import {
  isValidPreviewImage,
} from '../../../utils';

class ImagePreview extends Component {
  constructor(props) {
    super(props);
    this.openImageSelector = this.openImageSelector.bind(this);
    this.recipeImageFileChange = this.recipeImageFileChange.bind(this);
    this.state = {
      recipeImageFile: null,
      recipeImageFileError: false,
      recipeImagePreviewUrl: null,
    };
  }

  componentWillMount() {
    const { image } = this.props;
    this.setState({
      recipeImagePreviewUrl: image,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  openImageSelector() {
    this.recipeImageInput.click();
  }
  recipeImageFileChange(e) {
    this.props.setManageRecipeStatus(null);
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file instanceof Blob) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (isValidPreviewImage(file)) {
          this.setState({
            recipeImageFile: file,
            recipeImagePreviewUrl: reader.result,
          });
          this.props.setManageRecipeEntry('recipeImageFile', file);
        } else {
          this.setState({
            recipeImageFileError: true,
            recipeImageFile: null,
            recipeImagePreviewUrl: null,
          });
          this.props.setManageRecipeEntry('recipeImageFile', null);
        }
      };
    }
  }
  render() {
    const { recipeImagePreviewUrl, recipeImageFile } = this.state;
    return (
      <div>
        {/* Hidden file field */}
        <input
          type="file"
          name="recipeImage"
          onChange={this.recipeImageFileChange}
          ref={(ref) => { this.recipeImageInput = ref; }}
          style={{ display: 'none' }}
        />
        <button
          onClick={() => this.openImageSelector()}
          type="button"
          className="recipe-dummy-image-but zero-button"
        >
          {
            (
              typeof recipeImagePreviewUrl === 'string'
              && recipeImagePreviewUrl.length > 0
            )
            || isValidPreviewImage(recipeImageFile)
            ? (
              <img
                className="recipe-preview-image"
                src={recipeImagePreviewUrl}
                alt=""
              />
              )
            : (
              <div className="recipe-dummy-image">
                <i className="fa fa-coffee" />
                {
                  this.state.recipeImageFileError === false
                    ? <div>No image selected</div>
                    : <div style={{ color: 'red' }}>Invalid image selected</div>
                }
              </div>
            )
        }
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setManageRecipeEntry,
  setManageRecipeStatus,
}, dispatch);

export default connect(null, mapDispatchToProps)(ImagePreview);
