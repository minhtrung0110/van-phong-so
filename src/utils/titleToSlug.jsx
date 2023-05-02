export const titleToSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '');
};
