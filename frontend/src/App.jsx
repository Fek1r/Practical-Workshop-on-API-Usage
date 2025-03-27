import { Routes, Route } from 'react-router-dom';
import RegForm from './register/RegForm';
import LoginForm from './login/LoginForm';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
