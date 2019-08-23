'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid/v4');

const SyncSchema = new Schema({
    nextSyncToken: {
        type: String,
        required: true
    },
    syncId: {
        type: String,
        default: uuid
    },
    entries: Number,
    assets: Number,
    deletedEntries: Number,
    deletedAssets: Number
});

SyncSchema.set('timestamps', true);

const Sync = mongoose.model('Sync', SyncSchema);

const insertSync = response => {
    const sync = new Sync({
        nextSyncToken: response.nextSyncToken,
        entries: response.entries.length,
        assets: response.assets.length,
        deletedEntries: response.deletedEntries.length,
        deletedAssets: response.deletedAssets.length
    });

    return sync.save();
};

const getLastSync = () => {
    return Sync.find({})
        .sort([['createdAt', -1]])
        .limit(1)
        .then(sync => {
            if (sync.length === 0) {
                return null;
            }
            return sync[0];
        });
};

module.exports = {
    insertSync,
    getLastSync
};
