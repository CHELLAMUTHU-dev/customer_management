import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CustomerManagementContext = createContext(null);

const CustomerManagementProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const url = "http://localhost:7002/api";

  const convertToCamelCase = (data) => ({
    customerId: data.customer_id,
    firstName: data.first_name,
    lastName: data.last_name,
    phone: data.phone,
  });

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${url}/customers`);
      const camelCaseData = response.data.map(convertToCamelCase);
      setCustomers(camelCaseData);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      await axios.delete(`${url}/customers/${customerId}`);
    
        fetchCustomers()
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const updateCustomer = async (customerId, updatedData) => {
    try {
      await axios.put(`${url}/customers/${customerId}`, {
        first_name: updatedData.firstName,
        last_name: updatedData.lastName,
        phone: updatedData.phone,
      }); 
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.customerId === customerId
            ? { ...customer, ...updatedData }
            : customer
        )
      );
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const addAddress = async (customerId, addressData) => {
    try {
      const response = await axios.post(`${url}/customers/${customerId}/addresses`, {
        address_details: addressData.addressDetails,
        city: addressData.city,
        state: addressData.state,
        pin_code: addressData.pinCode,
      });
      setAddresses((prevAddresses) => [...prevAddresses, response.data]);
      toast.success("Address added successfully!");
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };  

  const updateAddress = async (addressId, updatedData) => {
    try {
      await axios.put(`${url}/customers/address/${addressId}`, {
        address_details: updatedData.addressDetails,
        city: updatedData.city,
        state: updatedData.state,
        pin_code: updatedData.pinCode,
      });
      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>  
          address.id === addressId
            ? { ...address, ...updatedData }
            : address
        )
      );
      toast.success("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
    }

  };


  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <CustomerManagementContext.Provider
      value={{
        customers,
        setCustomers,
        url,
        fetchCustomers,
        deleteCustomer,
        updateCustomer,
        addAddress,
        updateAddress
      }}
    >
      {children}
    </CustomerManagementContext.Provider>
  );
};

export default CustomerManagementProvider;
