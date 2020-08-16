var Instance = require('../models/instance');
var Opening = require('../models/opening');

var async = require('async');
var moment = require('moment');

const { check, validationResult } = require('express-validator/check');

function get_open_locations(openings) {
  var open_locations = [];
  for (let i = 0; i < openings.length; i++) {
    open_locations.push(openings[i].location);
  }
  return [...new Set(open_locations)];
}

exports.select_openings_get = function (req, res, next) {
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
            .sort({location: 1})
            .exec(function (err, openings) {
                var open_locations = get_open_locations(openings);
                callback(null, latest_instance, open_locations);
            });
        }
    ],
    function (err, latest_update, open_locations) {
        res.render('openings_select', { title: 'Select Openings', error: err, latest_update: latest_update, open_locations: open_locations, d_start: moment.utc().format('YYYY-MM-DD'), d_end:moment.utc().add(1, 'months').format('YYYY-MM-DD') });    
    }
    );
}

exports.select_openings_post = [
	(req, res, next) => {
        if(!(req.body.locations instanceof Array)){
            if(typeof req.body.locations==='undefined')
            req.body.locations=[];
            else
            req.body.locations=new Array(req.body.locations);
        }
        next();
    },
	
	check('locations.*', 'Location must not be empty.').isLength({ min: 1 }).escape(),
	check('start_date', 'Invalid start date').isISO8601().escape(),
	check('end_date', 'Invalid end date').isISO8601().escape(),
	
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
      
      
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
              .sort({location: 1})
              .exec(function (err, openings) {
                  var open_locations = get_open_locations(openings);
                  callback(null, latest_instance, open_locations);
              });
          }
      ],
      function (err, latest_update, open_locations) {
          if (err) { next(err); }
          var selected = [];
          for (let i = 0; i < open_locations.length; i++) {
            if (req.body.locations.indexOf(open_locations[i]) > -1) {
              selected.push(open_locations[i]);
            }
          }
          console.log(open_locations);
          res.render('openings_select', { title: 'Select Openings', open_locations: open_locations, selected_locations: selected, errors: errors.array(), d_start: req.body.start_date, d_end: req.body.end_date });   
      }
      );
    
			return;
		} else {
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
          .sort({location: 1})
          .exec(function (err, openings) {
              var open_locations = get_open_locations(openings);
              callback(null, latest_instance, open_locations);
          });
        },
				function(latest_instance, open_locations, callback) {
					Opening
					.find({ 'instance': latest_instance._id, 
						    'location': {$in: req.body.locations},
						    'date': {'$gte': req.body.start_date, '$lte': req.body.end_date}
						    })
					.sort({date: 1})
					.exec(function (err, openings) {
						callback(null, latest_instance, open_locations, openings);
					});
				}
			],
			function (err, latest_update, open_locations, selected_openings) {
        if (err) { next(err); }
        var selected = [];
        for (let i = 0; i < open_locations.length; i++) {
          if (req.body.locations.indexOf(open_locations[i]) > -1) {
            selected.push(open_locations[i]);
          }
        }
				res.render('openings_select', { title: 'Select Openings', error: err, latest_update: latest_update, open_locations: open_locations, selected_openings: selected_openings, errors: errors.array(), selected_locations: selected, d_start: req.body.start_date, d_end: req.body.end_date });  
			}
			);
		}
	}
];

exports.all_openings = function (req, res) {
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
        res.render('openings_all', { title: 'All Openings', error: err, latest_update: latest_update, all_openings: all_openings });    
    }
    );
}