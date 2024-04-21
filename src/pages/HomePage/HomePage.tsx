import React, { useState, useEffect } from 'react';
import { getAllItems } from '../../api/api';
import { IError, IItems } from '../../models/apiModels';
import './HomePage.css';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function HomePage() {

    const errorInitialValue: IError = {
        type: 'error',
        message: ''
    };
    const [items, setItems] = useState<IItems>([]);
    const [error, setError] = useState<IError>(errorInitialValue);

    useEffect(() => {        
        (async () => {
            try {
                setError(errorInitialValue);
                const data = await getAllItems();
                setItems(data);
            } catch {
                setError({ type: 'error', message: 'An error occured :(. Please try later.' });
            }            
        })();
    }, []);

    return (
        <>            
            <Typography variant="h2" gutterBottom>List Of Items:</Typography>
            { items.map((item) => <Box component="section" sx={{ p: 2, border: '1px dashed grey' }} className="item" key={item.id}><Link to={`/details/${item.id}`} key={item.id}><Typography variant="h3" gutterBottom>{item.title}</Typography><Typography variant="body1" gutterBottom>{item.body}</Typography></Link></Box>) }
            <Typography variant="body2" gutterBottom className={error.type}>{ error.message }</Typography>              
        </>
    )
}

export default HomePage;
