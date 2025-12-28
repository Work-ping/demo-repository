import { Routes, Route } from "react-router-dom";
import '@/assets/scss/app.scss';
// import AppRouter from '@/routes/router';
import AppProvidersWrapper from "@/components/wrappers/AppProvidersWrapper";
import SignUp  from '@/app/(other)/auth/sign-up/page';
// configureFakeBackend();
const App = () => {
  return (
    // <AppProvidersWrapper>
    <Routes>
      <Route path="/auth/sign-up" element={<SignUp />} />
    </Routes>
    // </AppProvidersWrapper>
  );

};
export default App;