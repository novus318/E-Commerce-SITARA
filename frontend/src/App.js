import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'

import Home from './Pages/Home';
import Login from './Pages/Login'


function App() {
  
  return (
    <div>
      <Router>
        <Routes>
        <Route exact path='/' element={ <Home/>}/>
        <Route exact path='/login' element={ <Login/>}/>
        </Routes>
      </Router>
      </div>
  );
}

export default App;