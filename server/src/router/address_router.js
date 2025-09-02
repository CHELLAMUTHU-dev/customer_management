const express = require('express');
const router = express.Router();

const {  createNewAddress, getAddressById, updateAddressById, deleteAddressById } = require('../controller/address_controller');


router.post('/:id/addresses', createNewAddress);
router.get('/:id/address', getAddressById);
router.put('/address/:addressId', updateAddressById);
router.delete('/:addressId', deleteAddressById);

module.exports = router;