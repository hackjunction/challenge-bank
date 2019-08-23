const contentful = require('contentful');
const controller = {};

const ContentHelpers = require('./helpers');
const Sync = require('./sync');

const ChallengeController = require('../challenge/controller');
const CategoryController = require('../category/controller');
const DifficultyController = require('../difficulty/controller');

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

controller.sync = async () => {
    const lastSync = await Sync.getLastSync();

    /** If content was synced within 60 seconds, abort the sync */
    if (lastSync !== null && Date.now() - lastSync.createdAt < 1000 * 60) {
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
