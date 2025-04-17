import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactComponent from './components/ContactComponent';
import ReservaComponent from './components/ReservaComponent';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginComponent from './pages/LoginComponent.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />           
        <Route path="/contacto" element={<ContactComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route 
          path="/reserva" 
          element={
            <ProtectedRoute>
              <ReservaComponent />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}


export default App
