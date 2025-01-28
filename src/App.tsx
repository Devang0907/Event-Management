import {BrowserRouter,Route, Routes} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import EventForm from './pages/EventForm';


function App() {

  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<EventForm/>}></Route>
       </Routes>
    </BrowserRouter>
  )
}

export default App
