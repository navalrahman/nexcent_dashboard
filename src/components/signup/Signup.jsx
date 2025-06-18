import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('datassss', data);
    try {
      // const response = await axios.post('http://localhost:9000/api/user/signup', data)
      const response = await axios.post('https://nexcent-backend-4vbo.onrender.com/api/user/signup', data)
      console.log(response);
      toast.success(response.data.status, { position: "top-right" })
      setTimeout(() => {
        navigate('/login')
      }, 2000)

    } catch (error) {
      console.log('error', error);

      toast.error(error.response.data.message, { position: "top-left" })
      setData({
        name:'',
        email:'',
        password:''
      })
    }
  }

  return (
    <div className='main-container'>
      <div className='image-container'>

      </div>
      <div className='login-container'>
        <div className='login-container-one'>
          <form className='login-container-form' onSubmit={handleSubmit}>
            {/* <div> */}
            <h1>Signup</h1>
            {/* </div> */}

            <div className='login-container-form-label'>
              <label htmlFor="">Name</label><br />
              <input
                type="text"
                placeholder='enter username here'
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
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
              <input disabled={!data.email || !data.name || !data.password} type="submit" value='Sign up' />
            </div>

            <div  style={{display:'flex',alignItems:'center', gap:'5px'}}>
              <p>Already have account? </p>
              <Link style={{textDecoration:'none'}} to='/login'>login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Signup


