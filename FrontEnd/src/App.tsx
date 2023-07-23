import { Container } from 'semantic-ui-react';
import './App.css'
import NavBar from './components/NavBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/AddOrderPage';
import SocialLogin from './pages/SocialLogin';
import { LocalJwt, LocalUser } from './types/AuthTypes';
import { getClaimsFromJwt } from './utils/jwtHelper';
import { useEffect, useState } from 'react';
import { AppUserContext } from './context/StateContext';
import ProtectedRoute from './components/ProtectedRoute';
import AddOrderPage from './pages/AddOrderPage';
import ListProductsPage from './pages/ListProductsPage';
import ListOrdersPage from './pages/ListOrdersPage';
import { ToastContainer } from 'react-toastify';
import ListUserPage from './pages/ListUserPage';
// import ExportToExcelProducts from './pages/ExportToExcelProducts';

export default function App() {


  const navigate = useNavigate();
  const [appUser, setAppUser] = useState<LocalUser | undefined>(undefined);

  useEffect(() => {


    const jwtJson = localStorage.getItem("upstorage_user");

    if (!jwtJson) {
        navigate("/loginPage");
        return;
    }

    const localJwt: LocalJwt = JSON.parse(jwtJson);

    const {uid, email, given_name, family_name} = getClaimsFromJwt(localJwt.accessToken);

    const expires: string = localJwt.expires;

    setAppUser({
        id: uid,
        email,
        firstName: given_name,
        lastName: family_name,
        expires,
        accessToken: localJwt.accessToken
    });


}, []);
  return (
    <>
    <AppUserContext.Provider value={{appUser, setAppUser}}>
      
      <Container className="App">
      <ToastContainer/>
      <NavBar />
        <Routes>
          {/* Anasayfada HomePage görüntülenmesini sağladım */}
           <Route path='/' element={<ProtectedRoute>
                                    <HomePage />
                                </ProtectedRoute>} />  
         
          <Route path='/loginPage' element={<LoginPage />} />
          <Route path='/social-login' element={<SocialLogin />} />
          <Route path='/orderPage' element={<ProtectedRoute><AddOrderPage /></ProtectedRoute>} />
          <Route path='/orderListPage' element={<ProtectedRoute><ListOrdersPage /></ProtectedRoute>} />
          <Route path='/userListPage' element={<ProtectedRoute><ListUserPage /></ProtectedRoute>} />
          <Route path='/productListPage/:orderId' element={<ListProductsPage />} />
          {/* <Route path='/exportToExcelProducts/:orderId' element={<ExportToExcelProducts />} /> */}



        </Routes>
      </Container>
      </AppUserContext.Provider>

    </>
  );
}