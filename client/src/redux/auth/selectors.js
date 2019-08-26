import { isEmpty } from 'lodash-es';
import { createSelector } from 'reselect';
import * as ContentSelectors from 'redux/content/selectors';

export const isLoggedIn = state => !isEmpty(state.auth.user);
export const user = state => state.auth.user;

export const token = createSelector(
    user,
    user => (user ? user.token : null)
);

export const userPopulated = createSelector(
    user,
    ContentSelectors.eventsMap,
    (user, eventsMap) => {
        if (!user) return null;
        return {
            ...user,
            event: eventsMap[user.event]
        };
    }
);
