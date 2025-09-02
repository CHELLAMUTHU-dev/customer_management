import { useContext, useState } from "react";
import "./CustomerList.css";
import { CustomerManagementContext } from "../../context/customerManagementContext.jsx";
import AddressForm from "../AddressForm/AddressForm.jsx";
import Popup from "reactjs-popup";
import "react-toastify"

const CustomerList = () => {
  const { customers, deleteCustomer, updateCustomer, addAddress } = useContext(
    CustomerManagementContext
  );

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [userAddress, setUserAddress] = useState({
    city: "",
    state: "",
    pinCode: "",
    addressDetails: "",
  });

  const onClickDelete = (customerId) => {
    deleteCustomer(customerId);
  };

  const onClickUpdate = (customerId) => {
    updateCustomer(customerId, userData);
  };
  


  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <div className="customer-list-container">
      <h2 className="customer-list-title">Customer List & Update</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>PHONE</th>
            <th>UPDATE</th>
            <th>DELETE</th>
            <th>+ ADDRESS</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerId}>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.phone}</td>
              <td>
                <Popup
                  trigger={<button className="update-button">Update</button>}
                  modal
                  nested
                >
                  {(close) => (
                    <div className="popup-modal">
                      <div className="popup-header">
                        <h2>Update Customer</h2>
                        <a className="close" onClick={close}>
                          &times;
                        </a>
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          onClickUpdate(customer.customerId);
                          close();
                        }}
                      >
                        <div  className='input-group'>
                          <label htmlFor="firstName">First Name:</label>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            onChange={inputHandler}
                            value={userData.firstName ?? customer.firstName}
                            placeholder="Enter First Name"
                          />
                        </div>
                        <div className='input-group'>
                          <label htmlFor="lastName">Last Name:</label>
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            onChange={inputHandler}
                            value={userData.lastName ?? customer.lastName}
                            placeholder="Enter Last Name"
                          />
                        </div>
                        <div className='input-group'>
                          <label htmlFor="phone">Phone:</label>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            onChange={inputHandler}
                            value={userData.phone ?? customer.phone}
                            placeholder="Enter Phone Number"
                          />
                        </div>
                        <div className="actions">
                          <button type="submit" className="update-button">
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </Popup>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => onClickDelete(customer.customerId)}
                >
                  Delete
                </button>
              </td>
              <td>
                <Popup
                  trigger={
                    <button className="add-address-button">+ Address</button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <AddressForm close ={close}/>
                  )}
                </Popup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
