import React, { useState, useEffect } from 'react';
import { IItem } from '../../models/apiModels';
import { getItemDetails } from '../../api/api';
import { useParams } from 'react-router-dom';

function Details() {

    const [itemDetails, setItemDetails] = useState<IItem>({
        userId: 1,
        id: 1,
        title: '',
        body: ''
    });
    const { id } = useParams()


    useEffect(() => {
        (async () => {
            const data = await getItemDetails(id as string);
            setItemDetails(data)
        })();
    }, [id]);

    return (
        <>            
            <h1>Item Details:</h1>
            <div>
                <h2>{itemDetails.title}</h2>
                <p>{itemDetails.body}</p>
            </div>             
        </>
    )
}

export default Details