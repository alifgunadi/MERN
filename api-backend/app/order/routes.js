const router = require('express').Router();
const orderController = require('./controller');
// const { police_check } = require('../../middleware/index')

router.post('/', 
    // police_check('create', 'Order'), 
    orderController.store
    );
router.get('/', 
    // police_check('view', 'Order'), 
    orderController.index
    );

module.exports = router;
