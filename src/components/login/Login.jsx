import React, { useState } from 'react'

import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data);
    try {
      // const response = await axios.post('http://localhost:9000/api/user/login', data)
       const response = await axios.post('https://nexcent-backend-4vbo.onrender.com/api/user/login', data)
      console.log(response);
      alert(response.data.status)
      setTimeout(() => {
        navigate('/')
        localStorage.setItem("token", response.data.data.token)
      }, 2000)
    } catch (error) {
      console.log('error', error);

      alert(error.response.data.message)
    }

  }

  return (
    <div className='login-container'>
      <div className='login-container-one'>
        <form onSubmit={handleSubmit} className='login-container-form'>
          {/* <div> */}
          <h1>Login</h1>
          {/* </div> */}
          <div className='login-container-form-label'>
            <label htmlFor="">Email</label><br />
            <input
              type="email"
              placeholder='enter email here'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="">Password</label><br />
            <input
              type="password"
              placeholder='enter password here'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>


          <div>
            {/* <label htmlFor="">Password</label> */}
            <input type="submit" value='login' />
          </div>

          <div>
            <Link to='/signup'>Dont have account access<br />Create here</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
