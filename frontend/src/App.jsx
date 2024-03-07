import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import Login from './pages/auth/Login'
import Header from './components/Header'
import TransactionPage from './pages/layout/TransactionPage'
import NotFound from './pages/layout/NotFound'
import HomePage from './pages/layout/HomePage'
import { useQuery } from '@apollo/client'
import GET_AUTH_USER from './graphql/queries/user.query'
import { Toaster } from 'react-hot-toast'

function App() {
 

  const { loading, error, data } = useQuery(GET_AUTH_USER);
  console.log("AuthUser:",data);
  if(loading) return null;
  return (
    <>
      {data?.authUser && <Header/>}
      
     <Routes>
      <Route path='/' element ={ data?.authUser? <HomePage/>: <Navigate to="/login"/>} />
      <Route  path='/signup' element ={ !data?.authUser? <SignUp/>: <Navigate to="/"/>} />
      <Route path='/login' element ={!data?.authUser? <Login/>: <Navigate to="/"/>} />
      <Route path='/transaction/:id' element ={data?.authUser? <TransactionPage/>: <Navigate to="/login"/> } />
      <Route path="*" element={<NotFound/>}/>
     </Routes>
     <Toaster/>
    </>
  )
}

export default App
