import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CustomerManagementContext } from "../../context/customerManagementContext";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import "./CustomerDetailsPage.css";

const CustomerDetailsPage = () => {
  const { url, updateAddress } = useContext(CustomerManagementContext);
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userAddress, setUserAddress] = useState({
    city: "",
    state: "",
    pinCode: "",
    addressDetails: "",
  });

  const addressInputHandler = (e) => {
    const { name, value } = e.target;
    setUserAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchCustomerDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/customers/${customerId}`);
      setCustomer(response.data);
    } catch (error) {
      console.error("Error fetching customer details:", error);
      setError("Failed to load customer details");
    } finally {
      setLoading(false);
    }
  };

  const fetchAddressDetails = async () => {
    try {
      const response = await axios.get(
        `${url}/customers/${customerId}/address`
      );
      if (response.data && response.data.length > 0) {
        setAddress(response.data[0]);
      } else {
        setAddress(null);
      }
    } catch (error) {
      console.error("Error fetching address details:", error);
      setError("Failed to load address details");
    }
  };

  const onClickUpdateAddress = async (addressId) => {
    try {
      await updateAddress(addressId, userAddress);
      setUserAddress({
        city: "",
        state: "",
        pinCode: "",
        addressDetails: "",
      });
      await fetchCustomerDetails();
      await fetchAddressDetails();
    } catch (error) {
      console.error("Error updating address:", error);
      setError("Failed to update address");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCustomerDetails();
      await fetchAddressDetails();
    };
    
    fetchData();
  }, [customerId]);

  if (loading) {
    return <div className="loading">Loading customer details...</div>;
  }

  

  return (
    <div className="customer-details-container">
      <h1 className="customer-details-heading">Customer Details</h1>
      
      <div className="customer-info">
        <h2>Personal Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>First Name:</label>
            <span>{customer.first_name}</span>
          </div>
          <div className="info-item">
            <label>Last Name:</label>
            <span>{customer.last_name}</span>
          </div>
          <div className="info-item">
            <label>Phone:</label>
            <span>{customer.phone}</span>
          </div>
        </div>
      </div>

      <div className="address-section">
        <h2>Address Information</h2>
        
        {address ? (
          <div className="address-details">
            <p><strong>Address:</strong> {address.address_details}</p>
            <p><strong>City:</strong> {address.city}</p>
            <p><strong>State:</strong> {address.state}</p>
            <p><strong>PIN Code:</strong> {address.pin_code}</p>
          </div>
        ) : (
          <p>No address found for this customer.</p>
        )}
        
        <Popup
          trigger={<button className="update-address-button">Update Address</button>}
          modal
          nested
          onOpen={() => {
            if (address) {
              setUserAddress({
                city: address.city || "",
                state: address.state || "",
                pinCode: address.pin_code || "",
                addressDetails: address.address_details || "",
              });
            }
          }}
        >
          {(close) => (
            <div className="popup-modal">
              <div className="popup-header">
                <h2>{address ? "Update Address" : "Add Address"}</h2>
                <button className="close" onClick={close}>
                  &times;
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onClickUpdateAddress(address ? address.address_id : null);
                  close();
                }}
              >
                <div className="input-group">
                  <label htmlFor="addressDetails">Address Details:</label>
                  <textarea
                    name="addressDetails"
                    id="addressDetails"
                    rows="4"
                    placeholder="Enter full address here"
                    required
                    value={userAddress.addressDetails}
                    onChange={addressInputHandler}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={userAddress.city}
                    placeholder="Enter your City"
                    onChange={addressInputHandler}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="state">State:</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={userAddress.state}
                    placeholder="Enter your State"
                    onChange={addressInputHandler}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="pinCode">PIN Code:</label>
                  <input
                    type="text"
                    name="pinCode"
                    id="pinCode"
                    value={userAddress.pinCode}
                    placeholder="Enter your Pin Code"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    title="Please enter a valid 6-digit PIN code"
                    onChange={addressInputHandler}
                    required
                  />
                </div>
                
                <div className="actions">
                  <button type="button" onClick={close} className="cancel-button">
                    Cancel
                  </button>
                  <button type="submit" className="confirm-button">
                    {address ? "Update Address" : "Add Address"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;