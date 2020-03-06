export const filters = state => state.filters.filters;
export const selectedCategories = state =>
  state.filters.filters.categories || [];
export const selectedDifficulties = state =>
  state.filters.filters.difficulties || [];
