import React, { useState, useEffect } from 'react'
import { getAllItems } from '../../api/api';
import { IItems } from '../../models/apiModels';
import './HomePage.css';

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
            <h1>List Of Items</h1>
            { items.map((item) => <div id={String(item.id)} key={item.id} className="item"><h2>{item.title}</h2><p>{item.body}</p></div>) }              
        </>
    )
}

export default HomePage