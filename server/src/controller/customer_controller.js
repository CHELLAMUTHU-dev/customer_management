const dbConnection = require('../config/dbConnect');

const getAllCustomers = (req, res)=> {
    const sql = 'SELECT * FROM customers';
    dbConnection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error', details: err });
        }
        res.json(results);
    });
}

const createNewCustomer = (req,res) => {
    const {first_name, last_name,  phone} = req.body;
    const sql = 'INSERT INTO customers (first_name, last_name, phone) VALUES (?, ?, ?)';
    dbConnection.query(sql, [first_name, last_name, phone], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database insert error', details: err });
        }
        res.status(201).json({ message: 'Customer created', customerId: results.insertId });
    });
}

const getCustomerById = (req,res) => {
    const customerId = req.params.id;
    const sql = 'SELECT * FROM customers WHERE customer_id = ?';
    dbConnection.query(sql, [customerId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error', details: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(results[0]);
    });
}

const updateCustomerById = (req,res) => {
    const customerId = req.params.id;
    const {first_name, last_name, phone} = req.body;
    const oldDataSql = 'SELECT * FROM customers WHERE customer_id = ?';
    dbConnection.query(oldDataSql, [customerId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error', details: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        const existingCustomer = results[0];
        const updatedCustomer = {
            first_name: first_name || existingCustomer.first_name,
            last_name: last_name || existingCustomer.last_name,
            phone: phone || existingCustomer.phone
        };
        performUpdate(customerId, updatedCustomer, res);
    });
}

const performUpdate = (customerId, {first_name, last_name, phone}, res) => {
    const sql = 'UPDATE customers SET first_name = ?, last_name = ?, phone = ? WHERE customer_id = ?';
    dbConnection.query(sql, [first_name, last_name, phone, customerId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database update error', details: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json({ message: 'Customer updated', customerId });
    });
}

const deleteCustomerById = (req,res) => {
    const customerId = req.params.id;
    const sql = 'DELETE FROM customers WHERE customer_id = ?';
    dbConnection.query(sql, [customerId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database delete error', details: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted', customerId });
    }
);
}   




module.exports = {
    getAllCustomers, createNewCustomer, getCustomerById, updateCustomerById, deleteCustomerById
};