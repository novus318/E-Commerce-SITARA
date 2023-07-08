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


function App() {
  
  return (
    <Layout>
      <Router>
        <Routes>
        <Route exact path='/' element={ <Home/>}/>
        <Route exact path='*' element={ <PageNot/>}/>
        <Route exact path='/login' element={ <Login/>}/>
        <Route exact path='/forgot-password' element={ <ForgotPassword/>}/>
        <Route exact path='/profile' element={ <PrivateRoute/>}>
        <Route exact path='' element={ <Profile/>}/>
        </Route>
        <Route exact path='/admin' element={ <AdminRoute/>}>
        <Route exact path='' element={ <AdminDashboard/>}/>
        </Route>
        </Routes>
      </Router>
      </Layout>
  );
}

export default App;