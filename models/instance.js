var mongoose = require('mongoose');
var moment = require('moment')

var Schema = mongoose.Schema;

var InstanceSchema = new Schema(
    {
        time_updated: {type: Date, required: true, default: Date.now() }
    }
);

InstanceSchema
.virtual('time_formatted')
.get(function () {
    return moment.utc(this.time_updated).format('LLLL');
});

module.exports = mongoose.model('Instance', InstanceSchema);