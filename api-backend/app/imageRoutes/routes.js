const router = require('express').Router();
const imageRemoveController = require('./controller');

router.delete('/:public_id', imageRemoveController.deleteIcon);

module.exports = router;