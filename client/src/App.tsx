import { Routes, Route } from 'react-router-dom';
import Default from './layouts/default';
import Home from './pages/Home';
import Folder from './pages/Folder';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route index element={<Home />} />
        <Route path="folder/:parentId" element={<Folder />} />
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
