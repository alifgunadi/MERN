const mongoose = require('mongoose');
const { model, Schema  } = mongoose;

const cartItemSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
    },
    qty: {
        type: Number,
        min: [1, "panjang karakter qty minimal 1 angka"],
        required: [true, "qty harus diisi"]
    },
    price: {
        type: Number,
        default: 0
    },
    image_url: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});


const CartItem = model('CartItem', cartItemSchema);
module.exports = CartItem