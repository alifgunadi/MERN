const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const tagController = require('./controller');
// const { police_check } = require('../../middleware');

router.get('/', tagController.index);
router.get('/:id', tagController.getId);
router.post('/', multer({dest: os.tmpdir}).single('pictures'), 
    // police_check('create', 'Tag'),
    tagController.store
);
router.put('/:id', multer({dest: os.tmpdir}).single('pictures'), 
    // police_check('update', 'Tag'),
    tagController.update
);
router.delete('/:id', 
    // police_check('delete', 'Tag'),
    tagController.remove
);

module.exports = router;