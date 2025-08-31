const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const dbConnection = require('./config/dbConnect');
const customerRoutes = require('./router/customer_router');
const addressRoutes = require('./router/address_router');


const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 7001;


try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        dbConnection.connect((err) => {
            if (err) {
                console.error('Error connecting to the database:', err);
            }else{
                console.log('Connected to the database.');
                console.log(process.env.DB_NAME);
            }
        });
    });
} catch (error) {
    console.error('Error starting the server:', error);
}

// Import and use customer routes
app.use('/api', customerRoutes);
app.use('/api/customers', addressRoutes);