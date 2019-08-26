import { createSelector } from 'reselect';
import { sortBy, reverse } from 'lodash-es';

export const submissions = state => state.submissions.data || [];
export const submissionsLoading = state => state.submissions.loading;
export const submissionsError = state => state.submissions.error;
export const submissionsUpdated = state => state.submissions.updated;

export const submissionsByDate = createSelector(
    submissions,
    submissions => reverse(sortBy(submissions, 'createdAt'))
);
