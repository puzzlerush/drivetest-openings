var mongoose = require('mongoose');
var moment = require('moment-timezone');

var Schema = mongoose.Schema;

var OpeningSchema = new Schema(
    {
        instance: {type: Schema.Types.ObjectId, ref: 'Instance', required: true},
        location: {type: String, required: true, maxlength: 100},
        date: {type: Date, required: true}
    }
);

OpeningSchema
.virtual('date_formatted')
.get(function () {
    return moment(this.date).tz('America/New_York').format('LL');
});

module.exports = mongoose.model('Opening', OpeningSchema);