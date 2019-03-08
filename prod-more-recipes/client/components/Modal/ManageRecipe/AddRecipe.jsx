import React from 'react';

import ManageRecipe from './index';

const AddRecipe = ({ options }) => (
  <ManageRecipe
    mode="new"
    options={options}
  />
);

export default AddRecipe;
