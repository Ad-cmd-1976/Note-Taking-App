import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {

  return (
    <>
      <h2 className='text-center'>Hello this is the beginning</h2>
      <Routes>
        <Route path='/' element={<SignupPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/dashboard' element={<DashboardPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
