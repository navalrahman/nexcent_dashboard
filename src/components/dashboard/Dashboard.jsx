import React from 'react';
import Header from '../header/Header';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { IoHomeOutline } from "react-icons/io5";
import { PiNumberSquareEight, PiNumberSquareFive, PiNumberSquareFour, PiNumberSquareOne, PiNumberSquareSeven, PiNumberSquareSix, PiNumberSquareThree, PiNumberSquareTwo } from "react-icons/pi";



import './Dashboard.css';

const Dashboard = () => {

    const location = useLocation()
    return (
        <div>
            <div className="header-wrapper">
                <Header />
            </div>

            <div className="second-container">
                <aside>
                    <nav>
                        <Link to='/' className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                            <IoHomeOutline /> Overview
                        </Link>
                        <Link to='/one' className={`nav-link ${location.pathname === '/one' ? 'active' : ''}`}>
                            <PiNumberSquareOne /> One
                        </Link>
                        <Link to='/second' className={`nav-link ${location.pathname === '/second' ? 'active' : ''}`} >
                            <PiNumberSquareTwo />Two
                        </Link>
                        <Link to='/third' className={`nav-link ${location.pathname === '/third' ? 'active' : ''}`} >
                            <PiNumberSquareThree /> Three
                        </Link>
                        <Link to='/fourth' className={`nav-link ${location.pathname === '/fourth' ? 'active' : ''}`} >
                            <PiNumberSquareFour /> Four
                        </Link>
                        <Link to='/five' className={`nav-link ${location.pathname === '/five' ? 'active' : ''}`} >
                            <PiNumberSquareFive /> Five
                        </Link>
                        <Link to='/six' className={`nav-link ${location.pathname === '/six' ? 'active' : ''}`}  >
                            <PiNumberSquareSix /> Six
                        </Link>
                        <Link to='/seven' className={`nav-link ${location.pathname === '/seven' ? 'active' : ''}`} >
                            <PiNumberSquareSeven /> Seven
                        </Link>
                        <Link to='/eight' className={`nav-link ${location.pathname === '/eight' ? 'active' : ''}`} >
                            <PiNumberSquareEight />Eight
                        </Link>
                    </nav>
                </aside>

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
