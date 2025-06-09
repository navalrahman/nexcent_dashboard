
import axios from 'axios';
import React, { useEffect, useState } from 'react';


import './thumbnailtwo.css'
const Thumbnailtwo = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/two/alllogos', {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setData(response.data.data);
    } catch (error) {
      console.log('Error fetching logos:', error);
    }
  };

  const handleEdit = (logo) => {
    setId(logo._id);
    setUrl(logo.url);
  };

  const handleCancelEdit = () => {
    setId('');
    setUrl('');
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:9000/api/two/logos/${id}`, 
        { url },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            // "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setId('');
      setUrl('');
      fetchData();
    } catch (error) {
      console.log('Error saving logo changes:', error);
    }
  };

  return (
    <div className='second-container'>
      <table className='second-container-one'>
        <thead>
          <tr>
            {/* <th>URL</th> */}
            {id ? <th>Url</th> : <th>Image</th>}


            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((logo) => (
            <tr key={logo._id} >
              {id === logo._id ? (
                <>
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
                  <td>
                    <button onClick={handleCancelEdit} style={{ marginRight: '8px' }}>Cancel</button>
                    <button onClick={handleSaveEdit}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  {/* <td >{logo.url}</td> */}
                  <td >
                    <img src={logo.url} alt="logo" style={{ width: '50px' }} />
                  </td>
                  <td>
                    <button onClick={() => handleEdit(logo)}>Edit</button>
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

export default Thumbnailtwo;
