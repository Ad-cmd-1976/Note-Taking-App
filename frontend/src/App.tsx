import './App.css';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore'

useEffect(()=>{
  
},[]);

function App() {
  const { user }=useAuthStore();
  return (
    <>
      <Routes>
        <Route path='/' element={!user ? <SignupPage/> : <Navigate to='/dashboard'/>}></Route>
        <Route path='/login' element={!user ? <LoginPage/>: <Navigate to='/dashboard'/>}></Route>
        <Route path='/dashboard' element={user ?<DashboardPage/>: <Navigate to='/'/>}></Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
