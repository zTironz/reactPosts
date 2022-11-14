 import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/NavBar/Navbar';
import { AuthContext } from './context';


 import './styles/app.css';


function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true)
    } 
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
   <HashRouter>
    <Navbar/>
    <AppRouter/>
    </HashRouter>
    </AuthContext.Provider>
 
  )
}

export default App;
