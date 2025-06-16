
import axios from 'axios';
import React, { useEffect, useState } from 'react';


import './thumbnailfive.css'
const Thumbnailfive = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [count, setCount] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await axios.get('http://localhost:9000/api/five/alldata',
                                       const response = await axios.get('https://nexcent-backend-4vbo.onrender.com/api/five/alldata',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (item) => {
    setId(item._id);
    setName(item.name);
    setCount(item.count);
    setUrl(item.url);
  };

  const handleCancel = () => {
    setId('');
    setName('');
    setCount('');
    setUrl('');
  };

  const handleSave = async () => {
    const updatedData = { name, count, url };

    try {
      // await axios.put(`http://localhost:9000/api/five/update/${id}`,
                        await axios.put(`https://nexcent-backend-4vbo.onrender.com/api/five/update/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          withCredentials: true
        }
      );
      setId('');
      fetchData();
    } catch (error) {
      console.log('Error updating data:', error);
    }
  };

  return (
    <div className='fifth-container'>
      <table className='fifth-container-one'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Count</th>
            {/* <th>URL</th> */}
            {/* <th>Image</th> */}
            {id ? <th>URL</th> : <th>Image</th>}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ele) => (
            <tr key={ele._id} >
              {id === ele._id ? (
                <>
                  <td >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
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
                    <img src={url} alt="preview" style={{ width: '50px' }} />
                  </td> */}
                  <td >
                    <button onClick={handleCancel} style={{ marginRight: '8px' }}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{ele.name}</td>
                  <td>{ele.count}</td>
                  {/* <td >{ele.url}</td> */}
                  <td>
                    <img src={ele.url} alt={ele.name} style={{ width: '50px' }} />
                  </td>
                  <td>
                    <button onClick={() => handleEdit(ele)}>Edit</button>
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

export default Thumbnailfive;
