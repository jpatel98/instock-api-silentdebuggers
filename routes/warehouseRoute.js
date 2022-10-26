const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router.route('/').get(warehouseController.index);
router.route('/:id').get(warehouseController.singleWarehouse)
router.route('/:id/inventories').get(warehouseController.warehouseInventories);
router.route('/').post(warehouseController.addWarehouse);

module.exports = router;