import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

import { FaEye, FaEyeSlash } from "react-icons/fa";



import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [show, setShow] = useState(true)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data);
    try {
      // const response = await axios.post('http://localhost:9000/api/user/login', data)
      const response = await axios.post('https://nexcent-backend-4vbo.onrender.com/api/user/login', data)
      console.log(response);
      toast.success(response.data.status, { position: "top-right" })
      setTimeout(() => {
        navigate('/')
        localStorage.setItem("token", response.data.data.token)
      }, 2000)
    } catch (error) {
      console.log('error', error);

      toast.error(error.response.data.message, { position: "top-right" })
    }

  }

  const handleShow = (data) => {
    console.log('clicked', data);
    setShow(false)
    setTimeout(() => {
      setShow(true)
    }, 2000)

  }

  return (
    <div className='main-container'>
      <div className='image-container'>
        asfasfjkhjk
      </div>
      <div className='login-container'>
        {/* naval */}
        <div className='login-container-one'>
          <form onSubmit={handleSubmit} className='login-container-form'>
            <h1>Login</h1>
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
              <div className='password-input' >
                <input
                  type={show ? "password" : "text"}
                  placeholder='enter password here'

                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}

                />
                {/* {data.password.length > 0 ? <FaEyeSlash onClick={() => handleShow(data.password)} /> : <FaEye />} */}
                {data.password.length === 0 ? (
                  <FaEye />
                ) : show ? (
                  <FaEyeSlash onClick={() => handleShow(data.password)} />
                ) : (
                  <FaEye onClick={() => handleShow(data.password)} />
                )}
                {/* </span> */}
              </div>
            </div>


            <div>
              <input type="submit" value='login' />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <p>Dont have account access?</p><Link style={{ textDecoration: 'none' }} to='/signup'> Create here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
