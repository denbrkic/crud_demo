import React, { useState, useEffect } from 'react';
import { IError, IItem } from '../../models/apiModels';
import { getItemDetails } from '../../api/api';
import { useParams } from 'react-router-dom';
import './Details.css';

function Details() {

    const [itemDetails, setItemDetails] = useState<IItem>({
        title: '',
        body: ''
    });
    const [error, setError] = useState<IError>({
        type: 'error',
        message: ''
    })
    const { id } = useParams()


    useEffect(() => {
        (async () => {
            try {
                const data = await getItemDetails(id as string);
                setItemDetails(data)
            } catch {
                setError({ type: 'error', message: 'An error occured :(. Please try later.' });
            }            
        })();
    }, [id]);

    return (
        <>            
            <h1>Item Details:</h1>
            <div>
                <h2>{itemDetails.title}</h2>
                <p>{itemDetails.body}</p>
            </div>
            <div className={error.type}>{ error.message }</div>             
        </>
    )
}

export default Details