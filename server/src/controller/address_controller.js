const dbConnection = require("../config/dbConnect");

const createNewAddress = (req, res) => {
  {
    const customerId = req.params.id;
    const checkCustomerQuery = "SELECT * FROM customers WHERE customer_id = ?";
    dbConnection.query(checkCustomerQuery, [customerId], (err, result) => {
      if (err) {
        console.error("Error checking customer:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const checkAddressQuery = "SELECT * FROM address WHERE customer_id = ?";
      dbConnection.query(checkAddressQuery, [customerId], (err, result) => {
        if (err) {
          console.error("Error checking address:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (result.length > 0) {
          return res
            .status(400)
            .json({ error: "Customer already has an address" });
        }

        const { city, state, pin_code } = req.body;
        const query =
          "INSERT INTO address (customer_id, city, state, pin_code) VALUES (?, ?, ?, ?)";
        dbConnection.query(
          query,
          [customerId, city, state, pin_code],
          (err, result) => {
            if (err) {
              console.error("Error creating address:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }
            res
              .status(201)
              .json({
                message: "Address created successfully",
                addressId: result.insertId,
              });
          }
        );
      });
    });
  }
};

const getAddressById = (req, res) => {
  const customerId = req.params.id;
  const query = "SELECT * FROM addresses WHERE customer_id = ?";
  dbConnection.query(query, [customerId], (err, results) => {
    if (err) {
      console.error("Error fetching address:", err);

      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.status(200).json(results);
  });
};

const updateAddressById = (req, res) => {
  const addressId = req.params.addressId;
  const { city, state, pin_code } = req.body;
  const oldAddressQuery = "SELECT * FROM addresses WHERE id = ?";
  dbConnection.query(oldAddressQuery, [addressId], (err, result) => {
    if (err) {
      console.error("Error fetching address:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Address not found" });
    }
  });
  const address = result[0];
  const updatedCity = city || address.city;
  const updatedState = state || address.state;
  const updatedPinCode = pin_code || address.pin_code;

  const query =
    "UPDATE addresses SET city = ?, state = ?, pin_code = ? WHERE id = ?";
  dbConnection.query(
    query,
    [updatedCity, updatedState, updatedPinCode, addressId],
    (err, result) => {
      if (err) {
        console.error("Error updating address:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Address not found" });
      }
      res.status(200).json({ message: "Address updated successfully" });
    }
  );
};

const deleteAddressById = (req, res) => {
  const addressId = req.params.addressId;
  const query = "DELETE FROM addresses WHERE id = ?";
  dbConnection.query(query, [addressId], (err, result) => {
    if (err) {
      console.error("Error deleting address:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  });
};

module.exports = {
  createNewAddress,
  getAddressById,
  updateAddressById,
  deleteAddressById,
};
