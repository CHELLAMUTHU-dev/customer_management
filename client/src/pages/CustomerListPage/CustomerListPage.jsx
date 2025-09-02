import {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { CustomerManagementContext } from '../../context/customerManagementContext'
import './CustomerListPage.css'


const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);
  const {url} = useContext(CustomerManagementContext)
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${url}/customers-with-addresses`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className='customer-list-page-container'>
      <h1 className='customer-list-page-title'>Customer List with Addresses</h1>
      <table className='customer-list-page-table'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>

            <th>Phone</th>
            <th>Address Details</th>
            <th>City</th>
            <th>State</th>
            <th>Pin Code</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            
            <tr key={customer.customer_id} onClick={() => navigate(`/customers/${customer.customer_id}`)} style={{ cursor: 'pointer' }}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.phone}</td>
              <td>{customer.address_details || 'N/A'}</td>
              <td>{customer.city || 'N/A'}</td>
              <td>{customer.state || 'N/A'}</td>
              <td>{customer.pin_code || 'N/A'}</td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerListPage
