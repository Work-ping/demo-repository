import { Routes, Route } from 'react-router-dom';
import SignUp from '../pages/signup/SignUp';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
