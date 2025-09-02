import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
        <div>
          <Link to='/' style={{textDecoration: 'none', color: 'white'}}>
            <h1>Customer Management System</h1>
          </Link>
          
        </div>
        <div className='header-right'>
            <Link to='/customer-list' style={{textDecoration: 'none', color: 'white'}}>
            <h2>Customer List</h2>
            </Link>
            <Link to='/add' style={{textDecoration: 'none', color: 'white'}}>
            <h2>+ Add Customer</h2>
            </Link>
        </div>
    </div>
  )
}

export default Header
