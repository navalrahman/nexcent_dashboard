import axios from 'axios';
import React, { useEffect, useState } from 'react'

import './thumbnailsix.css'

const Thumbnailsix = () => {

    const [data, setData] = useState([]);

    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // const response = await axios.get('http://localhost:9000/api/six/alldata',
            const response = await axios.get('http://localhost:9000/api/six/alldata',
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            setData(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }


    const handleEdit = (item) => {
        setId(item._id)
        setTitle(item.title)
        setContent(item.content)
        setUrl(item.url)
    }

    const handleCancel = () => {
        setId('')
        setTitle('')
        setContent('')
        setUrl('')
    }

    const handleSave = async () => {
        try {
            const updatedData = {
                title,
                content,
                url
            }

            // const response = await axios.put(`http://localhost:9000/api/five/update/${id}`,
            const response = await axios.put(`https://nexcent-backend-4vbo.onrender.com/api/five/update/${id}`,
                updatedData,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    withCredentials: true
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

        }
    }

    return (
        <div className='sixth-container'>
            <div className='sixth-container-one'>
                {
                    id ?
                        <div className='sixth-container-edit-items'>
                            <label className='sixth-container-edit-items-label' htmlFor="">Title</label>
                            <input className='sixth-container-edit-items-input' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <label className='sixth-container-edit-items-label' htmlFor="">conetnet</label>
                            <input className='sixth-container-edit-items-input' type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                            <label className='sixth-container-edit-items-label' htmlFor="">Url</label>
                            <input className='sixth-container-edit-items-input' type="text" value={url} onChange={(e) => setContent(e.target.value)} />
                            <div className='sixth-container-edit-items-buttons'>
                                <button onClick={handleCancel}>Cancel</button>
                                <button onClick={handleSave}>Save</button>
                            </div>
                        </div>
                        :
                        data.map((ele) => {
                            return (
                                <div>
                                    <h3>Title: {ele.title}</h3>
                                    <p>Content: {ele.content}</p>
                                    {/* <h3>{ele.url}</h3> */}
                                    <div>
                                        <h3><img src={ele.url} alt="" width='150px' /></h3>

                                        <button className='edit-button' onClick={() => handleEdit(ele)}>Edit</button>
                                    </div>

                                </div>
                            )
                        })
                }
            </div>
        </div >
    )
}

export default Thumbnailsix
