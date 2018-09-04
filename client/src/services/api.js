import Promise from 'bluebird';

const SUCCESS = 200;

const POST = (url, data) => {
    return new Promise(async function(resolve, reject) {
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status !== SUCCESS) {
                console.log('POST ERROR', response);
                reject(new Error('Response status was not 200'));
            } else {
                let body = await response.json();
                resolve(body.data);
            }
        } catch (error) {
            console.log('POST ERROR at ' + url, error);
            reject(error);
        }
    });
};

const PATCH = (url, data) => {
    return new Promise(async function(resolve, reject) {
        try {
            let response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status !== SUCCESS) {
                console.log('PATCH ERROR', response);
                reject(new Error('Response status was not 200'));
            } else {
                let body = await response.json();
                resolve(body.data);
            }
        } catch (error) {
            console.log('PATCH ERROR at ' + url, error);
            reject(error);
        }
    });
};

const GET = url => {
    return new Promise(async function(resolve, reject) {
        try {
            let response = await fetch(url);
            if (response.status !== SUCCESS) {
                console.log('GET ERROR', response);
                reject(new Error('Response status was not 200'));
            } else {
                let body = await response.json();
                resolve(body.data);
            }
        } catch (error) {
            console.log('GET ERROR at ' + url, error);
            reject(error);
        }
    });
};

const DELETE = url => {
    return new Promise(async function(resolve, reject) {
        try {
            let response = await fetch(url, { method: 'DELETE' });
            if (response.status !== SUCCESS) {
                console.log('DELETE ERROR', response);
                reject(new Error('Response status was not 200'));
            } else {
                let body = await response.json();
                resolve(body.data);
            }
        } catch (error) {
            console.log('DELETE ERROR at ' + url, error);
            reject(error);
        }
    });
};

const API = {
    adminLogin: (username, password) => {
        return GET(`/api/login/admin/?user=${username}&pass=${password}`);
    },

    adminGetEvent: (username, password, eventId) => {
        return GET(`/api/admin/events/${eventId}/?user=${username}&pass=${password}`);
    },

    adminGetEvents: (username, password) => {
        return GET(`/api/admin/events/?user=${username}&pass=${password}`);
    },

    adminCreateEvent: (username, password, event) => {
        return POST(`/api/admin/events/?user=${username}&pass=${password}`, event);
    },

    adminUpdateEvent: (username, password, event) => {
        return PATCH(`/api/admin/events/${event._id}/?user=${username}&pass=${password}`, event);
    },

    adminDeleteEvent: (username, password, eventId) => {
        return DELETE(`/api/admin/events/${eventId}/?user=${username}&pass=${password}`);
    },

    getEvents: () => {
        return GET('/api/events');
    },

    userLogin: (username, password) => {
        return POST('/api/login', { username, password });
    },

    userSignup: (username, password, secret) => {
        return POST('/api/signup', { username, password, secret });
    }
};

export default API;
