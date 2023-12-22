// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../Signup/signup';  
import Login from '../Login/loginform';  
import Profile from '../Profile/profile';
import HomePage from '../Home/home';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
         
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile></Profile>} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
