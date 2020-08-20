var mongoose = require('mongoose');
var moment = require('moment-timezone')

var Schema = mongoose.Schema;

var InstanceSchema = new Schema(
    {
        time_updated: {type: Date, required: true, default: Date.now() }
    }
);

InstanceSchema
.virtual('time_formatted')
.get(function () {
    return moment(this.time_updated).tz('America/New_York').format('LLLL');
});

module.exports = mongoose.model('Instance', InstanceSchema);