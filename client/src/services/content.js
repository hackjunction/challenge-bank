import axios from './axios'

const ContentService = {};

ContentService.sync = (syncId) => {
    return axios.get(`/content/sync/${syncId}`).then(res => {
        if (res.status === 'updated') {
            return res.data;
        }
        return;
    });
}

ContentService.initiateSync = () => {
    return axios.get('/content/sync');
}


export default ContentService;