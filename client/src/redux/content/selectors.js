import { createSelector } from "reselect";
import { reduce, map, sortBy, filter } from "lodash-es";

import * as FilterSelectors from "redux/filters/selectors";

export const syncId = state => state.content.syncId;
export const content = state => state.content.content || {};

export const events = createSelector(content, content => content.events);

export const eventsMap = createSelector(events, events =>
  reduce(
    events,
    (map, event) => {
      map[event.contentful_id] = event;
      return map;
    },
    {}
  )
);

export const challenges = createSelector(
  content,
  content => content.challenges
);
export const challengesMap = createSelector(challenges, challenges =>
  reduce(
    challenges,
    (map, challenge) => {
      map[challenge.contentful_id] = challenge;
      return map;
    },
    {}
  )
);

export const categories = createSelector(
  content,
  content => content.categories
);

export const categoriesSorted = createSelector(categories, categories =>
  sortBy(categories, "name")
);

export const categoriesMap = createSelector(categories, categories =>
  reduce(
    categories,
    (map, category) => {
      map[category.contentful_id] = category;
      return map;
    },
    {}
  )
);

export const difficulties = createSelector(
  content,
  content => content.difficulties
);

export const difficultiesSorted = createSelector(difficulties, difficulties =>
  sortBy(difficulties, "value")
);

export const difficultiesMap = createSelector(difficulties, difficulties =>
  reduce(
    difficulties,
    (map, difficulty) => {
      map[difficulty.contentful_id] = difficulty;
      return map;
    },
    {}
  )
);

export const challengesPopulated = createSelector(
  challenges,
  difficultiesMap,
  categoriesMap,
  (challenges, diffMap, catMap) =>
    map(challenges, challenge => {
      return {
        ...challenge,
        category: catMap[challenge.category],
        difficulty: diffMap[challenge.difficulty]
      };
    })
);

export const challengesPopulatedFiltered = createSelector(
  challengesPopulated,
  FilterSelectors.selectedCategories,
  FilterSelectors.selectedDifficulties,
  (challenges, categories, difficulties) => {
    return filter(challenges, challenge => {
      if (categories && categories.length) {
        if (categories.indexOf(challenge.category.contentful_id) === -1) {
          return false;
        }
      }

      if (difficulties && difficulties.length) {
        if (difficulties.indexOf(challenge.difficulty.contentful_id) === -1) {
          return false;
        }
      }
      return true;
    });
  }
);

export const challengesMapPopulated = createSelector(
  challengesPopulated,
  challenges =>
    reduce(
      challenges,
      (map, challenge) => {
        map[challenge.contentful_id] = challenge;
        return map;
      },
      {}
    )
);
