export const actionTypeEndsInSuccess = type => (
  type.substring(type.length - 8) === '_SUCCESS'
);

export default {};
