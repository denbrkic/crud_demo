import React from 'react'
import { Outlet, Link } from 'react-router-dom'

interface IMainLayout {
    children?: React.ReactNode | React.ReactNode[] | string;
}

function MainLayout({ children }: IMainLayout) {
    return (
        <>
            <header>
                <div>Simple CRUD Application</div>
                <ul>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/create">Create</Link></li>
                    </ul>
                </ul>
            </header>
            <main>                
                {children ? children : <Outlet />}
            </main>
            <footer>
                Setvi ©, All rights reserved
            </footer>
        </>
    );
}

export default MainLayout
