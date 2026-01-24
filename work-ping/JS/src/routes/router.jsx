import { useNavigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import { useAuthContext } from '@/context/useAuthContext';
import { appRoutes, authRoutes } from '@/routes/index';
import AdminLayout from '@/layouts/AdminLayout';
import axiosClient from '@/helpers/httpClient';
import { useEffect } from 'react';
const AppRouter = props => {
  const navigate = useNavigate();

  useEffect(()=>{
    const verifyCookie = async () => {
      try {
        await axiosClient.get('/verify-cookie');
      } catch(err) {
        navigate('/auth/sign-in-customized');
      }
    }
    verifyCookie();
  }, [])

  return <Routes>
      {(authRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={<AuthLayout {...props}>{route.element}</AuthLayout>} />)}

      {(appRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={ <AdminLayout {...props}>{route.element}</AdminLayout> } />)}
    </Routes>;
};
export default AppRouter;