// const router = require('express').Router();
// const cartController = require('./controller.js');
// const { police_check } = require('../../middleware/index.js')

// router.get('/', 
//     // police_check('read', 'Cart'), 
//     cartController.index
//     );
// router.post('/add-to-cart', cartController.addToCart);
// router.post('/increase-cart', cartController.increaseCart);
// router.post('/deacrease-cart', cartController.decreaseCart);
// router.post('/remove-from-cart', cartController.removeCart);

// module.exports = router;


const router = require('express').Router();
const cartController = require('./controller');
const { decodeToken } = require('../../middleware');


router.get('/', cartController.getCartItem);
router.post('/add-to-cart', cartController.addToCart);
router.put('/:id', cartController.updateCartItem);
router.delete('/:id', cartController.deleteCartItem);

module.exports = router;