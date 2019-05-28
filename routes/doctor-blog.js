var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');


/* GET doctor blog listing. */
router.get('/list', blogController.getList);
router.get('/create', blogController.create);
router.post('/create', blogController.save);
router.get('/detail/:id', blogController.getDetail);
router.get('/edit/:id', blogController.edit);
router.post('/edit/:id', blogController.update);
router.post('/delete/:id', blogController.delete);

module.exports = router;
