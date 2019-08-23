const contentful = require('contentful');
const controller = {};

const ContentHelpers = require('./helpers');
const Sync = require('./sync');

const ChallengeController = require('../challenge/controller');
const CategoryController = require('../category/controller');
const DifficultyController = require('../difficulty/controller');

const client = contentful.createClient({
    space: 'btin3qa49w60',
    accessToken: 'YyOH0hVHTVVsrZEn-qnF0MxF7Ij6oQAp28P-19dBy7o'
});

controller.sync = async () => {
    const lastSync = await Sync.getLastSync();

    /** If content was synced within 60 seconds, abort the sync */
    if (Date.now() - lastSync.createdAt < 1000 * 60) {
        return;
    }

    let sync;
    if (lastSync !== null) {
        sync = client.sync({
            nextSyncToken: lastSync.nextSyncToken
        });
    } else {
        sync = client.sync({
            initial: true,
            resolveLinks: true
        });
    }

    return sync
        .then(async response => {
            await ContentHelpers.performUpdates(response.entries);
            await ContentHelpers.performDeletes(response.deletedEntries);
            return response;
        })
        .then(async response => {
            await Sync.insertSync(response);
            return;
        });
};

controller.getSyncedContent = async syncId => {
    const lastSync = await Sync.getLastSync();

    if (lastSync !== null && syncId === lastSync.syncId) {
        return null;
    } else {
        const challenges = await ChallengeController.getAllChallenges();
        const difficulties = await DifficultyController.getAllDifficulties();
        const categories = await CategoryController.getAllCategories();

        return {
            content: {
                challenges,
                difficulties,
                categories
            },
            lastSyncId: lastSync ? lastSync.syncId : null
        };
    }
};

module.exports = controller;
