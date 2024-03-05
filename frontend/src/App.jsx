import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import Login from './pages/auth/Login'
import Header from './components/Header'
import TransactionPage from './pages/layout/TransactionPage'
import NotFound from './pages/layout/NotFound'
import HomePage from './pages/layout/HomePage'

function App() {
  const authUser = true;


  return (
    <>
      {authUser && <Header/>}
     <Routes>
      <Route path='/' element ={ authUser? <HomePage/>: <Navigate to="/login"/>} />
      <Route  path='/signup' element ={ !authUser? <SignUp/>: <Navigate to="/"/>} />
      <Route path='/login' element ={!authUser? <Login/>: <Navigate to="/"/>} />
      <Route path='/transaction/:id' element ={authUser? <TransactionPage/>: <Navigate to="/login"/> } />
      <Route path="*" element={<NotFound/>}/>
     </Routes>
    </>
  )
}

export default App
