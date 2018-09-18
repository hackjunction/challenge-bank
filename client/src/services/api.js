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
                console.log('ERROR1', response.status);
                reject(new Error(response.status));
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
                reject(new Error(response.status));
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
                reject(new Error(response.status));
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
                reject(new Error(response.status));
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
    /* ROUTES THAT REQUIRE ADMIN CREDENTIALS */
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

    adminUpdateEvent: (username, password, event, eventId) => {
        return PATCH(`/api/admin/events/${eventId}/?user=${username}&pass=${password}`, event);
    },

    adminDeleteEvent: (username, password, eventId) => {
        return DELETE(`/api/admin/events/${eventId}/?user=${username}&pass=${password}`);
    },

    adminGetSubmissions: (username, password) => {
        return GET(`/api/admin/submissions/?user=${username}&pass=${password}`);
    },

    adminGetSubmissionsForEvent: (username, password, eventId) => {
        return GET(`/api/admin/event/submissions/${eventId}/?user=${username}&pass=${password}`);
    },

    adminGetSubmissionById: (username, password, submissionId) => {
        return GET(`/api/admin/submissions/${submissionId}/?user=${username}&pass=${password}`);
    },

    adminReviewSubmission: (username, password, submissionId, decision, feedback) => {
        return POST(`/api/admin/submissions/${submissionId}/?user=${username}&pass=${password}`, {
            decision,
            feedback
        });
    },

    /* ROUTES THAT REQUIRE USER TOKEN */
    userLogin: (username, password) => {
        return POST('/api/login', { username, password });
    },

    updateUserWithToken: token => {
        return POST('/api/user', { token });
    },

    userSignup: (username, password, secret) => {
        return POST('/api/signup', { username, password, secret });
    },

    userGetSubmissions: token => {
        return GET(`/api/user/submissions/?token=${token}`);
    },

    userGetSubmissionById: (token, submissionId) => {
        return GET(`/api/user/submissions/${submissionId}/?token=${token}`);
    },

    userCreateSubmission: (token, submission) => {
        const data = {
            token,
            submission
        };
        return POST(`/api/user/submissions/`, data);
    },

    /* PUBLIC ROUTES */
    getEvents: () => {
        return GET('/api/events');
    },

    getEvent: eventId => {
        return GET(`/api/events/${eventId}`);
    },

    getEventScores: () => {
        return GET('/api/event-scores');
    },

    getUserScores: () => {
        return GET('/api/user-scores');
    }
};

export default API;
