const express = require('express');
const router = express.Router();

const {  createNewAddress, getAddressById, updateAddressById, deleteAddressById } = require('../controller/address_controller');


router.post('/:id/addresses', createNewAddress);
router.get('/:id/addresses', getAddressById);
router.put('/:addressId', updateAddressById);
router.delete('/:addressId', deleteAddressById);

module.exports = router;