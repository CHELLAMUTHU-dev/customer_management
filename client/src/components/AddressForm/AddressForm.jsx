import { useState } from "react";
import "./AddressForm.css";
const AddressForm = ({ close }) => {
  const [userAddress, setUserAddress] = useState({
    city: "",
    state: "",
    pinCode: "",
    addressDetails: "",
  });

  const onClickAddAddress = (customerId) => {
    addAddress(customerId, userAddress);
    setUserAddress({
      city: "",
      state: "",
      pinCode: "",
      addressDetails: "",
    });
  };

  const addressInputHandler = (e) => {
    const { name, value } = e.target;
    setUserAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="popup-modal">
      <div className="popup-header">
        <h2>Add Address</h2>
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClickAddAddress(customer.customerId, userAddress);
          close();
        }}
      >
        <div className="input-group">
          <label htmlFor="addressDetails">Address Details:</label>
          <textarea
            name="addressDetails"
            id="addressDetails"
            rows="4"
            cols="50"
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
            max={6}
            onChange={addressInputHandler}
            required
          />
        </div>
        <div className="actions">
          <button type="submit" className="add-address-button">
            Add Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
