const express = require('express');
const router = express.Router();
const { getAllCustomers, createNewCustomer, getCustomerById, updateCustomerById, deleteCustomerById } = require('../controller/customer_controller');

router.get('/customers', getAllCustomers);
router.post('/customers', createNewCustomer);
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id', updateCustomerById);
router.delete('/customers/:id', deleteCustomerById);


module.exports = router;