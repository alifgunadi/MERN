const router = require('express').Router();
const multer = require('multer');
const os = require('os');
// const { police_check } = require('../../middleware');
const productController = require('./controller');
const { decodeToken } = require('../../middleware');

router.get('/', productController.index);
router.get('/:id', productController.getId);
router.post('/', multer({dest: os.tmpdir()}).single('pictures'), 
    // police_check('create', 'Products'),
    productController.store
);
router.put('/:id', multer({dest: os.tmpdir()}).single('pictures'), 
    // police_check('update', 'Products'),
    productController.update
);
router.delete('/:id',
    // police_check('delete', 'Products'),
    productController.deleteItem
);
router.post('/add-to-cart', 
    decodeToken(), 
    productController.addToCart);
router.post('/increase-cart', 
    decodeToken(), 
    productController.increaseCart);
router.post('/decrease-cart', 
    decodeToken(), 
    productController.decreaseCart);
router.post('/remove-from-cart', 
    decodeToken(), 
    productController.removeCart);

module.exports = router;