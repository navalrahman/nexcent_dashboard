import React,{useEffect} from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Thumbnailone from './components/dashboard/thumbnailone/Thumbnailone'
import Thumbnailtwo from './components/dashboard/thumbnailtwo/Thumbnailtwo'
import Thumbnailthree from './components/dashboard/thumbnailthree/Thumbnailthree'
import Thumbnailfour from './components/dashboard/thumbnailfour/Thumbnailfour'
import Thumbnailfive from './components/dashboard/thumbnailfive/Thumbnailfive'
import Thumbnailsix from './components/dashboard/thumbnailsix/Thumbnailsix'
import Thumbnailseven from './components/dashboard/thumbnailseven/Thumbnailseven'
import Thumbnaileight from './components/dashboard/thumbnaileight/Thumbnaileight'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'



const Router = () => {

   const navigate = useNavigate()

  const token = localStorage.getItem('token')
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  },[])
  return (
    <div>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Dashboard />} >
          <Route index element={<Thumbnailone />} />
          <Route path='second' element={<Thumbnailtwo />} />
          <Route path='third' element={<Thumbnailthree />} />
          <Route path='fourth' element={<Thumbnailfour />} />
          <Route path='five' element={<Thumbnailfive />} />
          <Route path='six' element={<Thumbnailsix />} />
          <Route path='seven' element={<Thumbnailseven />} />
          <Route path='eight' element={<Thumbnaileight />} />
        </Route>
        <Route path="*" element={token ? <Navigate to='/' /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default Router