export const authorsToDropdownFormat = authors => authors.map(author => ({
  value: author.id,
  text: `${author.firstName} ${author.lastName}`
}));

export default {};
