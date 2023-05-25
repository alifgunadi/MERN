const CartItem = require('../cart-item/model');

const getCartItem = async (req,res) => {
    try {
        const user = req.user._id;
        const cartItems = await CartItem.find(user).populate('product');
        return res.json(cartItems);
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            return res.json({
                status: error,
                message: error.message,
                fields: error.errors
            })
        }
    }
};

const addToCart = async (req, res) => {
    try {
        const { product, qty, price, image_url, user } = req.body;
        const cartItems = new CartItem({product, qty, price, image_url, user});
        cartItems.save();
        return res.json(cartItems);
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            return res.json({
                status: error,
                message: error.message,
                fields: error.errors
            })
        }
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { qty } = req.body;
        const { id } = req.params;
        const cartItems = await CartItem.findByIdAndUpdate(id, {qty}, {new: true});
        return res.json(cartItems)
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            return res.json({
                status: error,
                message: error.message,
                fields: error.errors
            })
        }
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItems = await CartItem.findByIdAndDelete(id);
        return res.json(cartItems);
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            return res.json({
                status: error,
                message: error.message,
                fields: error.errors
            })
        }
    }
};

module.exports = {
    getCartItem,
    addToCart,
    updateCartItem,
    deleteCartItem
}




// const Users = require('../user/model.js');

// const addToCart = async (req, res) => {
//     const {userId, productId, price} = req.body;

//     try {
//       const user = await Users.findById(userId);
//       const userCart = user.cart;
//       if(user.cart[productId]){
//         userCart[productId] += 1;
//       } else {
//         userCart[productId] = 1;
//       }
//       userCart.count += 1;
//       userCart.total = Number(userCart.total) + Number(price);
//       user.cart = userCart;
//       user.markModified('cart');
//       await user.save();
//       res.status(200).json(user);
//     } catch (error) {
//         if (error && error.name === "Validation error") {
//             return res.json({
//                 error: error,
//                 message: error.message,
//                 fields: error.errors
//             })
//         }
//     }
// };

// const increaseCart = async () => {
//     const {userId, productId, price} = req.body;

//     try {
//       const user = await Users.findById(userId);
//       const userCart = user.cart;
//       userCart.total += Number(price);
//       userCart.count += 1;
//       userCart[productId] += 1;
//       user.cart = userCart;
//       user.markModified('cart');
//       await user.save();
//       res.status(200).json(user);
//     } catch (error) {
//         if (error && error.name === "Validation error") {
//             return res.json({
//                 error: error,
//                 message: error.message,
//                 fields: error.errors
//             })
//         }
//     }
// };

// const decreaseCart = async () => {
//     const {userId, productId, price} = req.body;

//     try {
//       const user = await Users.findById(userId);
//       const userCart = user.cart;
//       userCart.total -= Number(price);
//       userCart.count -= 1;
//       userCart[productId] -= 1;
//       user.cart = userCart;
//       user.markModified('cart');
//       await user.save();
//       res.status(200).json(user);
//     } catch (error) {
//         if (error && error.name === "Validation error") {
//             return res.json({
//                 error: error,
//                 message: error.message,
//                 fields: error.errors
//             })
//         }
//     }
// };


// const removeCart = async () => {
//     const {userId, productId, price} = req.body;

//     try {
//       const user = await Users.findById(userId);
//       const userCart = user.cart;
//       userCart.total -= Number(userCart[productId]) * Number(price);
//       userCart.count -= userCart[productId];
//       delete userCart[productId];
//       user.cart = userCart;
//       user.markModified('cart');
//       await user.save();
//       res.status(200).json(user);
//     } catch (error) {
//         if (error && error.name === "Validation error") {
//             return res.json({
//                 error: error,
//                 message: error.message,
//                 fields: error.errors
//             })
//         }
//     }
// };

// const update = async (req, res, next) => {
//     try {
//         const { items } = req.body;
//         const productIds = items.map(item => item.product._id) ;
//         const products = await Products.find({_id: {$in: productIds}});
//         let cartItems = items.map(item => {
//             let relatedProduct = products.find(product => product._id.toString() === item.product._id);
//             return {
//                 product: relatedProduct._id,
//                 price: relatedProduct.price,
//                 image_url: relatedProduct.image_url,
//                 name: relatedProduct.name,
//                 user: req.user._id,
//                 qty: item.qty
//             }
//         });

//         await CartItem.deleteMany({user: req.user._id});
//         await CartItem.bulkWrite(cartItems.map(item => {
//             return {
//                 updateOne: {
//                     filter: {
//                         user: req.user._id,
//                         product: item.product
//                     }
//                 },
//                 update: item,
//                 upsert: true
//             }
//         }));

//         return res.json(cartItems);

//     } catch (error) {
//         if (error && error.name === "Validation error") {
//             return res.json({
//                 error: error,
//                 message: error.message,
//                 field: error.errors
//             })
//         }
//         next(error);
//     }
// };

// const index = async (req, res, next) => {
//     try {

//         let items = await CartItem.find({user: req.user._id}).populate('product');
//         return res.json(items);
        
//     } catch (error) {
//         if (error && error.name === 'Validation Error') {
//             return res.json({
//                 error: error,
//                 message: error.message,
//                 field: error.errors
//             })
//         }
//         next(error);
//     }
// };

// module.exports = {
//     addToCart,
//     increaseCart,
//     decreaseCart,
//     removeCart,
    // update,
    // index
// }