import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import './MainLayout.css';

interface IMainLayout {
    children?: React.ReactNode | React.ReactNode[] | string;
}

function MainLayout({ children }: IMainLayout) {
    return (
        <div className="container">
            <header className='main-header'>
                <Typography variant="h1" gutterBottom style={{marginBottom: '0'}}>Simple CRUD Application</Typography>
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/"><Typography variant="button" gutterBottom>Home</Typography></Link></li>
                        <li><Link to="/create"><Typography variant="button" gutterBottom>Create</Typography></Link></li>
                    </ul>
                </nav>                
            </header>
            <main className="main-content">      
                {children ? children : <Outlet />}
            </main>
            <footer className="main-footer">
                <Typography variant="body2"><span style={{color: '#1976d2', background: '#bad6f2'}}>Denis Brkic ©</span>, All rights reserved</Typography>
            </footer>
        </div>
    );
}

export default MainLayout;
