const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    trip_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    create_date: { type: Date, default: Date.now },
    plan: [{ location_id: Number, location_name: String, date: Date }],
}, {
    collection: 'Planning',
    versionKey: false
});

const planning = mongoose.model('Planning', schema);

module.exports = planning;