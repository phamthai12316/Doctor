var express = require('express');
var router = express.Router();
var healthController = require('../controllers/healthController');


/* GET health listing. */
router.get('/list', healthController.getList);
router.get('/create', healthController.create);
router.post('/create', healthController.save);
router.get('/detail/:id', healthController.getDetail);
router.get('/edit/:id', healthController.edit);
router.post('/edit/:id', healthController.update);
router.post('/delete/:id', healthController.delete);

module.exports = router;
