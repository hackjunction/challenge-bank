const mongoose = require('mongoose');

const script = function() {
    console.log('Resetting database...');
    mongoose.connect(
        'mongodb://localhost/challengeBank',
        function(err) {
            if (err) {
                console.log('Error connecting to database', err);
                process.exit(0);
            }

            mongoose.connection.db.dropDatabase(function(err) {
                if (err) {
                    console.log('Error resetting database', err);
                }

                console.log('DONE.');
                process.exit(0);
            });
        }
    );
};

script();
