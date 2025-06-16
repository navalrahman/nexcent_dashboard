import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './thumbnailthree.css'
const Thumbnailthree = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetchAssociationData();
  }, []);

  const fetchAssociationData = async () => {
    try {
      // const response = await axios.get('http://localhost:9000/api/three/association',{
        const response = await axios.get('https://nexcent-backend-4vbo.onrender.com/api/three/association',{
        headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}
      });
      setData(response.data.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setTitle(item.title);
    setContent(item.content);
    setUrl(item.url);
  };

  const handleSave = async () => {
    const updatedData = { title, content, url };

    try {
      // await axios.put(`http://localhost:9000/api/three/association/${editId}`, 
      await axios.put(`https://nexcent-backend-4vbo.onrender.com/api/three/association/${editId}`, 
        updatedData,
      {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        withCredentials: true
      });
      setEditId('');
      fetchAssociationData();
    } catch (error) {
      console.log('Error updating data:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditId('');
    setTitle('');
    setContent('');
    setUrl('');
  };

  return (
    <div className='third-container'>
      <table className='third-container-one'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            {editId ? <th>URL</th> : <th>Image</th>}
            {/* <th>URL</th> */}
            {/* <th>Image</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} >
              {editId === item._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}

                    />
                  </td>
                  <td >
                    <input
                      type="text"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}

                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}

                    />
                  </td>
                  {/* <td>
                    <img src={url} alt="preview" style={{ width: '100px' }} />
                  </td> */}
                  <td>
                    <div>
                      <button onClick={handleSave} >Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td >{item.title}</td>
                  <td >{item.content}</td>
                  {/* <td >{item.url}</td> */}
                  <td >
                    <img src={item.url} alt="content" style={{ width: '100px' }} />
                  </td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Thumbnailthree;
