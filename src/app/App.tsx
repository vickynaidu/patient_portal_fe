// import React from 'react';
// import { useSelector } from 'react-redux';
// import Login from './components/login/Login';
// import Dashboard from './components/Dashboard';
// import { RootState } from './app/store';

// const App: React.FC = () => {
//   const isAuthenticated = useSelector((state: RootState) => state.loginReducer.isAuthenticated);

//   return (
//     <div className="App">
//       {isAuthenticated ? <Dashboard /> : <Login />}
//     </div>
//   );
// }

// export default App;

import {
  BrowserRouter, Navigate, Routes, Route,
} from 'react-router-dom';

import MainLayout from '../components/layouts/MainLayout';
import ConsoleLayout from '../components/layouts/ConsoleLayout';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Logout from '../components/pages/Logout';
import Signup from '../components/pages/Signup';
import ForgotPassword from '../components/pages/ForgetPassword';
import NotFound from '../components/pages/NotFound';
import Profile from '../components/pages/Profile';
import Dashboard from '../components/pages/Dashboard';
import Apps from '../components/pages/Apps';
import Users from '../components/pages/Users';
import Settings from '../components/pages/Settings';
import AuthProvider from '../hooks/AuthProvider';
import SessionsView from '../components/pages/Sessions';
import Specializations from '../components/pages/Specializations';

const App: React.FC = () => {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot" element={<ForgotPassword />} />
            <Route path="not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Route>
          <Route path="console" element={<ConsoleLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="apps" element={<Apps />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="sessions" element={<SessionsView />} />
            <Route path="specialization" element={<Specializations />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;