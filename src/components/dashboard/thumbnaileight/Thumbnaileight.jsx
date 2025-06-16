import axios from 'axios';
import React, { useState, useEffect } from 'react'

import './thumbnaileight.css'

const Thumbnaileight = () => {
    const [info, setInfo] = useState([]);
    const [Editing, setEditing] = useState('')
    const [id, setId] = useState('');

    const [url, setUrl] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchinfo()
    }, [])


    const fetchinfo = async () => {
        try {
            // const response = await axios.get('http://localhost:9000/api/eight/images',
            const response = await axios.get('https://nexcent-backend-4vbo.onrender.com/api/eight/images',
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            // console.log(response.data)

            setInfo(response.data.data)
        } catch (error) {
            console.error('error while fetching the data')
        }
    }
    const handleEdit = (item) => {
        console.log("Edit clicked", item);
        setEditing(item._id);
        setId(item._id);

        setUrl(item.url);
        setContent(item.content);
    };

    const handlecancel = (item) => {
        setId('')
        setEditing('')

        setUrl('')
        setContent('')
    }

    const handlesave = async () => {
        try {
            const updatedItem = {
                url,
                content
            }
            // const response = await axios.put(`http://localhost:9000/api/eight/edits/${id}`,
            const response = await axios.put(`https://nexcent-backend-4vbo.onrender.com/api/eight/edits/${id}`,
                updatedItem,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    withCredentials: true
                }
            )
            console.log('updatedItem', response)

            if (response.status === 200) {
                alert('data edited successfully')
                const updatedItem = response.data.data

                setInfo((preventitems) =>
                    preventitems.map((item) =>
                        item._id === id ? { ...item, ...updatedItem } : item
                    )
                )
                handlecancel()
            } else {
                console.log('failed to updated');

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='eight-container'>
            <table className='eight-container-one'>
                <thead>
                    <tr>
                        {/* <th>Image</th> */}
                        {/* <th>Url</th> */}
                        {Editing ? <th>Url</th> : <th>Image</th>}
                        <th>Content</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map(item => (
                        <tr >
                            {/* <td >
                                <img src={item.url} height={70} alt="images" />
                            </td> */}
                            <td >
                                {Editing === item._id ? (
                                    <input type="text" placeholder="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                                ) : <img src={item.url} alt="" height={70} />}
                            </td>
                            <td >
                                {Editing === item._id ? (
                                    <input type="text" placeholder="content" value={content} onChange={(e) => setContent(e.target.value)} />
                                ) : item.content}
                            </td>
                            <td>
                                {Editing === item._id ? (
                                    <>
                                        <button onClick={handlesave}>save</button>
                                        <button onClick={handlecancel}>cancel</button>
                                    </>
                                ) : (
                                    <button onClick={() => handleEdit(item)}>Edit</button>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Thumbnaileight
