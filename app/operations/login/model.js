var mongo = require("../../lib/mongo");
exports.ObjectId = mongo.ObjectID;

var db_name = 'painthub';

exports.findUser = function (user, callback) {

    // fetch db object
    mongo.connect(db_name, function (err, db) {

        // handle error
        if (err) {
            return callback(err);
        }

        // fetch collection
        db.collection("users", function (err, col) {

            // handle error
            if (err) {
                return callback(err);
            }

            // find user
            col.findOne(user, callback);
        });
    });
};

exports.registerUser = function (user, callback) {

    if (!user) {
        return callback(new Error("ERR_MISSING_USER"));
    }

    mongo.connect(db_name, function (err, db) {

        // handle error
        if (err) {
            return callback(err);
        }

        db.collection("users", function (err, col) {

            if (err) {
                return callback(err);
            }

            col.insert(user, callback);
        });
    })
};