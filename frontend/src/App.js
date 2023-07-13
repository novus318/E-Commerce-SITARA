import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login'
import Profile from './Pages/Profile';
import PageNot from './Pages/PageNot';
import Layout from './Components/Layout';
import PrivateRoute from './Components/routes/PrivateRoute';
import ForgotPassword from './Pages/ForgotPassword';
import AdminRoute from './Components/routes/AdminRoute';
import AdminDashboard from './Pages/admin/AdminDashboard';
import CreateCategory from './Pages/admin/CreateCategory';
import CreateProduct from './Pages/admin/CreateProduct';
import Users from './Pages/admin/Users';
import Orders from './Pages/admin/Orders';
import UserOrders from './Components/Orders/Orders'
import Products from './Pages/admin/Products';
function App() {
  
  return (
    <Layout>
      <Router>
        <Routes>
        <Route exact path='/' element={ <Home/>}/>
        <Route exact path='*' element={ <PageNot/>}/>
        <Route exact path='/login' element={ <Login/>}/>
        <Route exact path='/forgot-password' element={ <ForgotPassword/>}/>
        <Route exact path='/user' element={ <PrivateRoute/>}>
        <Route exact path='/user/profile' element={ <Profile/>}/>
        <Route exact path='/user/orders' element={ <UserOrders/>}/>
        </Route>
        <Route exact path='/admin' element={ <AdminRoute/>}>
        <Route exact path='/admin' element={ <AdminDashboard/>}/>
        <Route exact path='/admin/create-category' element={ <CreateCategory/>}/>
        <Route exact path='/admin/create-product' element={ <CreateProduct/>}/>
        <Route exact path='/admin/products' element={ <Products/>}/>
        <Route exact path='/admin/users' element={ <Users/>}/>
        <Route exact path='/admin/orders' element={ <Orders/>}/>
        </Route>
        </Routes>
      </Router>
      </Layout>
  );
}

export default App;