//  @ This file exports all middlewares decleared in the containing folder
//  import all available middlewares here
import validators from './validators';
import authenticators from './authenticators';

//  An object holding the middlewares to be exported
const middlewares = { validators, authenticators };

// export object
export default middlewares;
