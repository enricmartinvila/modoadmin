import { Route, Routes, Navigate } from 'react-router-dom';
import { ThHome } from '../pages/home/ThHome';
import { Tdb } from '../pages/db/Tdb';
import { ThSettings } from '../pages/settings/ThSettings';
import Login from '../pages/login/Login';

const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  return token ? true : false;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={isAuthenticated() ? <ThHome /> : <Navigate to='/login' />} />
      <Route path='/settings' element={isAuthenticated() ? <ThSettings /> : <Navigate to='/login' />} />
      <Route path='/database' element={isAuthenticated() ? <Tdb /> : <Navigate to='/login' />} />
    </Routes>
  );
};

export default AppRoutes;
