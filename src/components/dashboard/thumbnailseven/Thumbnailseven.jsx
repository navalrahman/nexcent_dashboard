import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './Thumbnailseven.css'

const Thumbnailseven = () => {
    const [data, setData] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [contentTwo, setContentTwo] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/seven/alldata',
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (data) => {
        setId(data._id);
        setName(data.name);
        setContent(data.content);
        setContentTwo(data.contenttwo);
        setUrl(data.url);
    };

    const handleCancel = () => {
        setId('');
        setName('');
        setContent('');
        setContentTwo('');
        setUrl('');
    };

    const handleSave = async () => {
        try {
            const updatedItem = {
                name,
                content,
                contentTwo,
                url
            };

            const response = await axios.put(`http://localhost:9000/api/seven/update/${id}`,
                updatedItem,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                alert('Data updated successfully');
                const updatedResponseItem = response.data.data;

                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === id ? { ...item, ...updatedResponseItem } : item
                    )
                );

                handleCancel();
            } else {
                console.error('Update failed:', response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='seventh-container'>
            <div className='seventh-container-one'>
                {id ? (
                    <div className='seventh-container-edit-items'>
                        <label className='seventh-container-edit-items-label' htmlFor="">Name</label>
                        <input className='seventh-container-edit-items-input' type="text" value={name} onChange={(e) => setName(e.target.value)} />

                        <label className='seventh-container-edit-items-label' htmlFor="">Content</label>
                        <textarea className='seventh-container-edit-items-input' type="text" value={content} onChange={(e) => setContent(e.target.value)} />

                        <label className='seventh-container-edit-items-label' htmlFor="">Second content</label>
                        <input className='seventh-container-edit-items-input' type="text" value={contentTwo} onChange={(e) => setContentTwo(e.target.value)} />

                        <label className='seventh-container-edit-items-label' htmlFor="">Url</label>
                        <input className='seventh-container-edit-items-input' type="text" value={url} onChange={(e) => setUrl(e.target.value)} />

                        <div className='seventh-container-edit-items-buttons'>
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    data.map((ele) => (
                        <div key={ele._id}>
                            <h3>{ele.name}</h3>
                            <p>{ele.content}</p>
                            <p>{ele.contenttwo}</p>
                            {/* <p>{ele.url}</p> */}
                            <div><img src={ele.url} alt="" /></div>
                            <div><button className='edit-button' onClick={() => handleEdit(ele)}>Edit</button></div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Thumbnailseven;
