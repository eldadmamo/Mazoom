import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Welcome from './component/Welcome/Welcome';
import Whatsapp from './component/Login/Whatsapp';
import EmailLogin from './component/Login/EmailLogin';
import Main from './component/Main';
import UploadImage from './component/UploadImage/UploadImage';
import Categories from './component/Categories/Categories';
import AddNames from './component/AddNames/addNames';
import EmptyGuest from './component/GuestEvent/EmptyGuest';
import { Merge } from 'lucide-react';
import SettingPower from './component/Login/SettingPower';
import EmailSignUp from './component/Login/EmailSignUp';

function PrivateRoute({ children, isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin'); 
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/what" element={<Whatsapp />} />
        <Route
          path="/signin"
          element={<EmailLogin onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<EmailSignUp onLogin={handleLogin} />}
        />
        <Route
          path="/setting"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <SettingPower />
            </PrivateRoute>
          }
        />
        <Route
          path="/main"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <UploadImage />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path="/merge"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Merge />
            </PrivateRoute>
          }
        />
        <Route
          path="/addname"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <AddNames />
            </PrivateRoute>
          }
        />
        <Route
          path="/guest"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <EmptyGuest />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
