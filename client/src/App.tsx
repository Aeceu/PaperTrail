import { Routes, Route } from 'react-router-dom';
import Default from './layouts/default';
import Home from './pages/Home';
import Folder from './pages/Folder';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PersistLayout from './layouts/PersisLayout';

const App = () => {
  return (
    <Routes>
      <Route element={<PersistLayout />}>
        <Route path="/" element={<Default />}>
          <Route index element={<Home />} />
          <Route path="folder/:parentId" element={<Folder />} />
        </Route>
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
