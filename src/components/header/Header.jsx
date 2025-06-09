import React from 'react'
import './Header.css'

const Header = () => {

    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div className='heading-container'>
            <div className='heading'>
                <h3>Dashbaord</h3>
                <h3>Nexcent Website</h3>
                <h3 style={{cursor:'pointer'}} onClick={handleLogout}>Logout</h3>
            </div>
        </div>
    )
}

export default Header