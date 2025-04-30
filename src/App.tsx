import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Login';
import Register from './pages/Register';
import VerifyCode from './pages/account/VerifyCode'
import Layout from './shared/components/Layout';
import FileVisualization from './features/repository/pages/FileVisualization';


function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="account/register" element={<Register />} />
        <Route path="account/verify-code" element={<VerifyCode />} />
        
        {/* Rutas con Layout */}
        <Route element={<Layout />}>
          <Route path="file-repository" element={<FileVisualization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
