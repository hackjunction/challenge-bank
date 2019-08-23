const categoryRouter = require('./category/routes');
const challengeRouter = require('./challenge/routes');
const contentRouter = require('./content/routes');
const difficultyRouter = require('./difficulty/routes');
const eventRouter = require('./event/routes');
const submissionRouter = require('./submission/routes');
const userRouter = require('./user/routes');

module.exports = function(app) {
    app.get('/api', (req, res) => {
        res.status(200).json({
            message: 'Hello!'
        });
    });
    app.use('/api/category', categoryRouter);
    app.use('/api/challenge', challengeRouter);
    app.use('/api/content', contentRouter);
    app.use('/api/difficulty', difficultyRouter);
    app.use('/api/event', eventRouter);
    app.use('/api/submission', submissionRouter);
    app.use('/api/user', userRouter);
};
