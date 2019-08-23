import * as ActionTypes from './actionTypes';
import ContentService from 'services/content';
import * as ContentSelectors from './selectors';

export const updateContent = () => (dispatch, getState) => {
    ContentService.initiateSync().catch(() => {});
    const syncId = ContentSelectors.syncId(getState());
    dispatch({
        type: ActionTypes.UPDATE_CONTENT,
        promise: ContentService.sync(syncId),
        meta: {
            onFailure: e => console.log('Error syncing content', e)
        }
    });
}