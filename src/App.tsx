import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/auth/login/pages/Login';
import Register from './features/auth/register/pages/Register';
import Projects from './pages/Projects';
import VerifyCode from './features/auth/verifyCode/pages/VerifyCode';
import Layout from './shared/components/Layout';
import FileVisualization from './features/repository/pages/FileVisualization';


function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/account/verify-code" element={<VerifyCode />} />
        <Route path="/projects" element={<Projects />} />
        
        {/* Rutas con Layout */}
        <Route element={<Layout />}>
          <Route path="/file-repository" element={<FileVisualization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
