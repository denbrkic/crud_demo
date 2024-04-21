import React, { useState, useEffect } from 'react'
import { getAllItems } from '../../api/api';
import { IItems } from '../../models/apiModels';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {

    const [items, setItems] = useState<IItems>([]);

    useEffect(() => {
        (async () => {
            const data = await getAllItems();
            setItems(data)
        })();
    }, []);

    return (
        <>            
            <h1>List Of Items:</h1>
            { items.map((item) => <Link to={`/details/${item.id}`} key={item.id} className="item"><h2>{item.title}</h2><p>{item.body}</p></Link>) }              
        </>
    )
}

export default HomePage