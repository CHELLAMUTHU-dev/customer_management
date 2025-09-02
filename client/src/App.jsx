import CustomerForm from "./components/CustomerForm/CustomerForm"
import Header from "./components/Header/Header";
import CustomerListPage from "./pages/CustomerListPage/CustomerListPage";
import CustomerList from "./components/CustomerList/CustomerList"
import CustomerDetailsPage from "./pages/CustomerDetailsPage/CustomerDetailsPage";
import "./App.css"
import {  Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/add" element={<CustomerForm />} />
        <Route path="/customer-list" element={<CustomerListPage />} />
        <Route path="/customers/:customerId" element={<CustomerDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App