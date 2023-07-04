import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login'
import Profile from './Pages/Profile';
import PageNot from './Pages/PageNot';
import Layout from './Components/Layout';


function App() {
  
  return (
    <Layout>
      <Router>
        <Routes>
        <Route exact path='/' element={ <Home/>}/>
        <Route exact path='*' element={ <PageNot/>}/>
        <Route exact path='/login' element={ <Login/>}/>
        <Route exact path='/profile' element={ <Profile/>}/>
        </Routes>
      </Router>
      </Layout>
  );
}

export default App;