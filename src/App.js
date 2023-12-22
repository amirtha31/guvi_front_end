import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/loginform';
import Signup from './Components/Signup/signup';
import Profile from './Components/Profile/profile';
import { MantineProvider } from '@mantine/core';
import { Link } from 'react-router-dom';
import React from 'react';
import RoutesComponent from './Components/Routes/RoutesComponent';
function App() {
  return (
    <div className="App">
    
    <MantineProvider>
        <RoutesComponent />

      </MantineProvider>
      
    </div>
  );
}

export default App;
