/* eslint-disable func-names */
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'] },
    date: { type: Date, default: Date.now },
});
// instance methods
todoSchema.methods = {
    // eslint-disable-next-line object-shorthand
    findActive: function () {
        return mongoose.model('Todo').find({ status: 'active' });
    },
    // eslint-disable-next-line object-shorthand
    findinActive: function (cb) {
        console.log('hello');
        return mongoose.model('Todo').find({ status: 'active' }, cb);
    },
};
// static methods
todoSchema.statics = {
    // eslint-disable-next-line object-shorthand
    findpotato: function () {
        return this.find({ title: /potato/i });
    },
};
// query helpers
todoSchema.query = {
    // eslint-disable-next-line object-shorthand
    findLang: function (language) {
        return this.find({ title: new RegExp(language, 'i') });
    },
};
module.exports = todoSchema;
