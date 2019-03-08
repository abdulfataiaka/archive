import React from 'react';
import { splitIngredients } from '../../utils';

export default ({ ingredients }) => {
  const ingredientsArray = splitIngredients(ingredients);
  return (
    <div className="box mt-3">
      <div className="box-head">
        <i className="fa fa-coffee mr-2" /> Ingredients ({ingredientsArray.length})
      </div>
      <div style={{ display: 'block', margin: '20px auto', width: '90%' }}>
        {
          ingredientsArray.length > 0 ?
          ingredientsArray.map((item, index) => {
            const key = `item-${index}`;
            return <span key={key} className="float-left ingredient-tag">{item}</span>;
          })
          : <div className="view-no-item">There are no ingredients for this recipe</div>
        }
        <div className="clear" />
      </div>
    </div>
  );
};
