import axios from 'axios';
import React, { useEffect, useState } from 'react';


import './thumbnailfour.css'
const Thumbnailfour = () => {
    const [data, setData] = useState([]);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/four/alldata',
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEdit = (item) => {
        setId(item._id);
        setTitle(item.title);
        setContent(item.content);
        setUrl(item.url);
    };

    const handleCancel = () => {
        setId('');
        setTitle('');
        setContent('');
        setUrl('');
    };

    const handleSave = async () => {
        try {
            const updatedItem = {
                title,
                content,
                url
            };

            const response = await axios.put(`http://localhost:9000/api/four/editdata/${id}`,
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
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className='fourth-container'>
            <div className='fourth-container-one'>
                {id ? (
                    <div className='fourth-container-edit-items'>
                        <label className='fourth-container-edit-items-label' htmlFor="">Title</label>
                        <input
                            className='fourth-container-edit-items-input'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <label className='fourth-container-edit-items-label' htmlFor="">Content</label>
                        <textarea
                            className='fourth-container-edit-items-input'
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Content"
                        />
                        <label className='fourth-container-edit-items-label' htmlFor="">Url</label>
                        <input
                            className='fourth-container-edit-items-input'
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Image URL"
                        />
                        <div className='fourth-container-edit-items-buttons'>
                            <button onClick={handleCancel}>Cancel</button>
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>
                ) : (
                    data.map((item) => (
                        <div key={item._id}>
                            <h3>Title: {item.title}</h3>
                            <p>Paragraph: {item.content}</p>
                            <img src={item.url} alt={item.title} style={{ maxWidth: '200px' }} />
                            <div>
                                <button className='edit-button' onClick={() => handleEdit(item)}>Edit</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Thumbnailfour;
