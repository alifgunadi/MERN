const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const categoriesController = require('./controller');

router.get('/', categoriesController.index);
router.get('/:id', categoriesController.getId);
router.post('/', categoriesController.store);
router.put('/:id', categoriesController.update);
router.delete('/:id', categoriesController.remove);

module.exports = router;