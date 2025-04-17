import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Login';
import Register from './pages/Register';
import VerifiCode from './pages/VerifiCode';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/VerifiCode" element={<VerifiCode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
