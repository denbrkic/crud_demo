import React, { useState, useEffect } from 'react';
import { IItem } from '../../models/apiModels';
import { getItemDetails } from '../../api/api';
import { useParams } from 'react-router-dom';

function Details() {

    const [itemDetails, setItemDetails] = useState<IItem>({
        title: '',
        body: ''
    });
    const [error, setError] = useState<string>("")
    const { id } = useParams()


    useEffect(() => {
        (async () => {
            try {
                const data = await getItemDetails(id as string);
                setItemDetails(data)
            } catch {
                setError('An error occured :(. Please try later.');
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
            <div>{ error }</div>             
        </>
    )
}

export default Details