import axios from 'axios';
import React, { useState, useEffect } from 'react';


import './Thumbnailone.css'


const Thumbnailone = () => {

  // axios.defaults.withCredentials = true;


  const [data, setData] = useState([]);

  const [id, setId] = useState('')
  const [index, setIndex] = useState('')
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [para, setPara] = useState('');
  const [url, setUrl] = useState('')


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // const response = await axios.get('http://localhost:9000/api/one/alldata', {
      const response = await axios.get('https://nexcent-backend-4vbo.onrender.com/api/one/alldata',{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      // console.log('fetchdata', response);
      setData(response.data.data)

    } catch (error) {
      console.error("Error fetching logos:", error);
    }
  }

  const handleEdit = (data) => {
    console.log('data', data);
    setId(data._id)
    setTitle(data.title)
    setYear(data.year)
    setPara(data.para)
    setUrl(data.url)
  }

  const handleCancel = () => {
    setId('')
    setTitle('')
    setYear('')
    setPara('')
    setUrl('')
  }

  const handleSave = async () => {
    try {

      const updatedData = {
        title,
        year,
        para,
        url
      }

      // const response = await axios.put(`http://localhost:9000/api/one/editdata/${id}`,
      const response = await axios.put(`https://nexcent-backend-4vbo.onrender.com/api/one/editdata/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            // "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      console.log("updatedDataNaval", response);

      if (response.status === 200) {
        alert('Data edited successfully');
        const updatedItem = response.data.data;

        setData((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, ...updatedItem } : item
          )
        );
        // fetchData()
        handleCancel();
      } else {
        console.error('Update failed:', response.data.message);
      }
    } catch (error) {
      console.log(error);

    }

  }

  return (
    <div className='first-container'>
      <div className='first-container-one'>
        {
          id ?
            // data.map((ele) => {
            //     return (
            <>
              <div className='first-container-edit-items'>
                <label className='first-container-edit-items-label'>Title</label>
                <input className='first-container-edit-items-input' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                <label className='first-container-edit-items-label'>Year</label>
                <input className='first-container-edit-items-input' type='text' value={year} onChange={(e) => setYear(e.target.value)} />
                <label className='first-container-edit-items-label'>Paragraph</label>
                <input className='first-container-edit-items-input' type='text' value={para} onChange={(e) => setPara(e.target.value)} />
                <label className='first-container-edit-items-label'>Url</label>
                <input className='first-container-edit-items-input' type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
                <div className='first-container-edit-items-buttons'>
                  <button onClick={handleCancel}>Cancel</button>
                  <button onClick={handleSave}>Save</button>
                </div>
              </div>
            </>
            // )
            // }) 
            :
            data.map((ele, i) => {
              return (
                // <>
                <div key={i}>
                  <h3>Title: {ele.title}</h3>
                  <h3>Year:  {ele.year}</h3>
                  <h3>Paragraph: {ele.para}</h3>
                  <div>
                    <img src={ele.url} alt="" width={"200px"} />
                  </div>
                  <button className='edit-button' onClick={() => handleEdit(ele)}>Edit</button>
                </div>
                // </>
              )
            })
        }
      </div>
    </div>
  )
}

export default Thumbnailone
