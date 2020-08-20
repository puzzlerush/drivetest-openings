#! /usr/bin/env node

console.log('This script populates some test data to the database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Instance = require('./models/instance')
var Opening = require('./models/opening')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var instances = []
var openings = []

function instanceCreate(time, cb) {
    var instance = new Instance({time_updated: time});
    instance.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Instance: ' + instance);
        instances.push(instance)
        cb(null, instance);
    }); 
}

function openingCreate(instance, location, date, cb) {
    openingdetail = { instance: instance, location: location, date: date }
    var opening = new Opening(openingdetail);
    opening.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Opening: ' + opening);
        openings.push(opening);
        cb(null, opening);
    });
}

function createInstances(cb) {
    async.series([
        function (callback) {
            instanceCreate('2020-08-22', callback);
        },
        function (callback) {
            instanceCreate('2020-09-17', callback);
        },
        function (callback) {
            instanceCreate('2020-12-12', callback);
        },
    ],
    cb);
}

function createOpenings(cb) {
    async.parallel([
        function(callback) {
            openingCreate(instances[0], 'Kitchener', '2020-08-23', callback);  
        },
        function(callback) {
            openingCreate(instances[0], 'Kitchener', '2020-08-28', callback);  
        },
        function(callback) {
            openingCreate(instances[0], 'Guelph', '2020-09-01', callback);  
        },
        function(callback) {
            openingCreate(instances[0], 'Brantford', '2020-09-03', callback);  
        },
        function(callback) {
            openingCreate(instances[0], 'Stratford', '2020-09-15', callback);  
        },
        function(callback) {
            openingCreate(instances[1], 'Kitchener', '2020-09-18', callback);  
        },
        function(callback) {
            openingCreate(instances[1], 'Kitchener', '2020-11-23', callback);  
        },
        function(callback) {
            openingCreate(instances[1], 'Guelph', '2020-12-01', callback);  
        },
        function(callback) {
            openingCreate(instances[1], 'Brantford', '2020-10-31', callback);  
        },
        function(callback) {
            openingCreate(instances[1], 'Stratford', '2020-12-15', callback);  
        },
        function(callback) {
            openingCreate(instances[2], 'Kitchener', '2020-12-31', callback);  
        },
        function(callback) {
            openingCreate(instances[2], 'Kitchener', '2020-12-25', callback);  
        },
        function(callback) {
            openingCreate(instances[2], 'Guelph', '2021-01-01', callback);  
        },
        function(callback) {
            openingCreate(instances[2], 'Brantford', '2021-01-02', callback);  
        },
        function(callback) {
            openingCreate(instances[2], 'Stratford', '2021-02-02', callback);  
        },
    ],
    cb);
}

async.series([
    createInstances,
    createOpenings,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Openings: ' + openings);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



