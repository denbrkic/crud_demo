import React, { useState, useEffect } from 'react'
import { getAllItems } from '../../api/api';
import { IError, IItems } from '../../models/apiModels';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {

    const [items, setItems] = useState<IItems>([]);
    const [error, setError] = useState<IError>({
        type: 'error',
        message: ''
    });

    useEffect(() => {        
        (async () => {
            try {
                setError({ type: 'error', message: '' });
                const data = await getAllItems();
                setItems(data);
            } catch {
                setError({ type: 'error', message: 'An error occured :(. Please try later.' });
            }            
        })();
    }, []);

    return (
        <>            
            <h1>List Of Items:</h1>
            { items.map((item) => <Link to={`/details/${item.id}`} key={item.id} className="item"><h2>{item.title}</h2><p>{item.body}</p></Link>) }
            <div className={error.type}>{ error.message }</div>              
        </>
    )
}

export default HomePage