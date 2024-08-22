import React from 'react';
import { useDispatch } from 'react-redux';
//import { logout } from '../features/authSlice';
import { Button } from 'react-bootstrap';
import { AppDispatch } from '../app/store';
import MainLayout from './layouts/MainLayout';

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    //dispatch(logout());
  };

  return (
    <MainLayout></MainLayout>
  );
};

export default Dashboard;