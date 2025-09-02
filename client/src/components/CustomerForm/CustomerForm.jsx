import "./CustomerForm.css";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {CustomerManagementContext} from "../../context/customerManagementContext";

const CustomerForm = () => {
  const {setCustomers,fetchCustomers, url} = useContext(CustomerManagementContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(url+"/customers", {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
    });

    fetchCustomers()
    toast.success("Customer added successfully!");
    setFormData({ firstName: "", lastName: "", phone: "" });

  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};


  return (
    <section className="customer-form-section">
      <div className="customer-form">
        <h2 className="form-title">Customer Form</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="John"
                id="firstName"
                value={formData.firstName}
                name="firstName"
                onChange={inputHandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                id="lastName"
                value={formData.lastName}
                name="lastName"
                onChange={inputHandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                name="phone"
                onChange={inputHandler}
                placeholder="555-555-5555"
                pattern="[0-9]{10}"
                title="Please enter a valid phone number"
                max={10}
                required
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
      </div>
      <img
        src="https://res.cloudinary.com/dwo2f3fyw/image/upload/v1756701161/login_d2mpuh.jpg"
        alt="Customer"
        className="customer-image"
      />
    </section>
  );
};

export default CustomerForm;
