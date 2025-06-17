import React, { useState } from 'react'
import './Header.css'
import toast from 'react-hot-toast'

const Header = () => {

    const [modal, setModal] = useState(false)

    const handleModalopen = () => {
        setModal(true)
    }

    const handleLogout = () => {
        localStorage.clear()
        toast.success("successfully logged out", { position: "top-right", duration: 2000 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }


    return (
        <div className='heading-container'>
            <div className='heading'>
                <h3>Dashbaord</h3>
                <h3>Nexcent Website</h3>
                <h3 className='logout' style={{ cursor: 'pointer', }} onClick={handleModalopen}>Logout</h3>

                {modal && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <h2>Do you want to logout?</h2>
                            <div style={{display:'flex', alignItems: "center", justifyContent:"space-around", gap:"10px"}}>
                            <button className='close-btn' onClick={() => setModal(false)}>Close</button>
                            <button className='logout-btn' onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Header