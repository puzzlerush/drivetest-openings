var Instance = require('../models/instance');
var Opening = require('../models/opening');

var async = require('async');
var moment = require('moment-timezone');

exports.data = function (req, res) {
    async.waterfall([
        function(callback) {
            Instance.findOne()
            .sort({ time_updated: -1 })
            .exec(function (err, latest_instance) {
                callback(null, latest_instance);
            });
        },
        function(latest_instance, callback) {
            Opening
            .find({ instance: latest_instance._id })
            .sort({date: 1})
            .exec(function (err, openings) {
                callback(null, latest_instance, openings);
            });
        }
    ],
    function (err, latest_update, all_openings) {
        res.setHeader('Content-Type', 'application/json');
        res.send({ latest_update: latest_update, all_openings: all_openings });    
    }
    );
}