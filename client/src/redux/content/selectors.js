import { createSelector } from 'reselect';
import { reduce, map } from 'lodash-es';

export const syncId = state => state.content.syncId;
export const content = state => state.content.content || {};

export const challenges = createSelector(
    content,
    content => content.challenges
);
export const challengesMap = createSelector(
    challenges,
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

export const categories = createSelector(
    content,
    content => content.categories
);
export const categoriesMap = createSelector(
    categories,
    categories =>
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
export const difficultiesMap = createSelector(
    difficulties,
    difficulties =>
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
