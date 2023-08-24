import { DEFAULT_LIMIT, DEFAULT_PAGE } from './constants.js';

const validatePageAndLimit = (page, limit) => {
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  const currentPage = pageNumber > 0 ? pageNumber : DEFAULT_PAGE;
  const perPage = limitNumber > 0 ? limitNumber : DEFAULT_LIMIT;

  return { currentPage, perPage };
};

export { validatePageAndLimit };
