const router = require('express').Router();
const multer = require('multer');
const os = require('os');
// const { police_check } = require('../../middleware');
const productController = require('./controller');

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


module.exports = router;