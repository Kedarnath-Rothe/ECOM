// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AdminLayout } from './components/layouts/AdminLayout';
import UserLayout from './components/layouts/UserLayout';
import About from './pages/About';
import Contact from './pages/Contact';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Service from './pages/Products';
import Register from './pages/Register';

import Addproduct from './pages/Addproduct';
import AdminContacts from './pages/Admin-Contacts';
import AdminProduct from './pages/Admin-Products';
import AdminUpdate from './pages/Admin-Update';
import AdminUsers from './pages/Admin-Users';
import BookProduct from './pages/BuyProduct';
import Manageproduct from './pages/Manageproduct';
import OrderHistory from './pages/OrderHistory';
import ProductUpdate from './pages/Product-Update';
import Updateuser from './pages/Updateuser';
import UserCart from './pages/UserCart';

const App = () => { 

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/logout' element={<Logout/>} /> 
        <Route path='/addproduct' element={<Addproduct/>} /> 
        <Route path='/*' element={<Error/>} /> 
        <Route path='/admin' element={<AdminLayout/>} />

        <Route path='/userhome' element={<UserLayout/>} />

        <Route path='/admin/users' element = {<AdminUsers/>} />
        <Route path='/admin/user/:id/edit' element = {<AdminUpdate/>} />
        <Route path='/admin/contacts' element = {<AdminContacts/>} />

        <Route path='/admin/products' element = {<AdminProduct/>} />
        <Route path='/admin/products/:id/edit' element = {<ProductUpdate/>} />

        <Route path='/manageproduct' element = {<Manageproduct/>} /> 

        <Route path='/user/users/:id/edit'element = {<Updateuser/>} /> 

        {/* <Route path='/user/productdetails/:id'element = {<Productsdetail/>} />  */}

        <Route path='/user/bookproduct/:id' element = {<BookProduct/>} />

        {/* <Route path='/user/bookproduct/bill/:id' element = {<Bill/>} /> */}

        <Route path='/user/usercart' element = {<UserCart/>} />

        <Route path='/oderhistory' element = {<OrderHistory/>} />
      </Routes> 
      <Footer/>    
    </BrowserRouter>
    </>
  )
}

export default App
