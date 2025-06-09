import React from 'react';
import Header from '../header/Header';
import { Link, Outlet, useLocation } from 'react-router-dom';



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
                        <Link to='/' className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}> One</Link>
                        <Link to='/second' className={`nav-link ${location.pathname === '/second' ? 'active' : ''}`} > Two</Link>
                        <Link to='/third' className={`nav-link ${location.pathname === '/third' ? 'active' : ''}`} > Three</Link>
                        <Link to='/fourth' className={`nav-link ${location.pathname === '/fourth' ? 'active' : ''}`} > Four</Link>
                        <Link to='/five' className={`nav-link ${location.pathname === '/five' ? 'active' : ''}`} >Five</Link>
                        <Link to='/six'className={`nav-link ${location.pathname === '/six' ? 'active' : ''}`}  >Six</Link>
                        <Link to='/seven' className={`nav-link ${location.pathname === '/seven' ? 'active' : ''}`} >Seven</Link>
                        <Link to='/eight' className={`nav-link ${location.pathname === '/eight' ? 'active' : ''}`} >Eight</Link>
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
