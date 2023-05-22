const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const categorySchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Category min. 3 character'],
        maxlength: [20, 'Category max. 3 character'],
        required: [true, 'Category does not exist']
    },

    image_url: {
        type: String,
        required: [true, 'Image url harus ada']
    }
}, {timestamps: true});

const Category = model('Category', categorySchema);
module.exports = Category;