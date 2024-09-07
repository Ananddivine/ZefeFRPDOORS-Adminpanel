import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Components/Navbar/Navbar';
import Admin from './Pages/admin/Admin';

const App = () => {
  const navigate = useNavigate(); 

  useEffect(() => {

    const authToken = localStorage.getItem('auth-token');

 
    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]); 

  return (
    <div>
      <Navbar />
      <Admin />
    </div>
  );
};

export default App;
