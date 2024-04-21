import React, { useState, useEffect, SyntheticEvent } from 'react';
import { IError, IItem } from '../../models/apiModels';
import { deleteItem, getItemDetails, updateItem } from '../../api/api';
import { useParams } from 'react-router-dom';
import './Details.css';

function Details() {

    const errorInitialValue: IError = {
        type: 'error',
        message: ''
    };
    const [itemDetails, setItemDetails] = useState<IItem>({
        title: '',
        body: ''
    });
    const [error, setError] = useState<IError>(errorInitialValue);
    const [formData, setFormData] = useState<IItem>({
        title: '',
        body: '' 
    });
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const { id } = useParams()
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

    useEffect(() => {
        (async () => {
            try {
                const data = await getItemDetails(id as string);
                setItemDetails(data)
                setFormData(data)
            } catch {
                setError({ type: 'error', message: 'An error occured :(. Please try later.' });
            }            
        })();
    }, [id]);

    useEffect(() => {
        if (timeoutId) {
            return () => clearTimeout(timeoutId); 
        }
    }, [timeoutId])

    async function handleDelete() {
        try {
            await deleteItem(id as string);
            timeoutId = setTimeout(() => {
                window.location.href = '/';
            }, 5000);
            setError({ type: 'success', message: 'The item was successfully deleted.' });
        } catch {
            setError({ type: 'error', message: 'An error occured :(. Please try later.' });
        }   
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        try {
            setError(errorInitialValue);
            await updateItem({ id: Number(id), title: formData['title'], body: formData['body'] });
            setError({ type: 'success', message: 'The item was successfully updated.' });
        } catch {
            setError({ type: 'error', message: 'An error occured :(. Please try later.' });
        }
    }


    return (
        <>            
            <h1>Item Details:</h1>
            <div>
                <h2>{itemDetails.title}</h2>
                <p>{itemDetails.body}</p>
            </div>
            <div>
                <button onClick={handleDelete}>Delete</button>
                { isUpdating ? (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" onChange={(e) => setFormData((oldData) => ({...oldData, title: e.target.value}))} value={formData['title']} />
                            <label htmlFor='body'>Body</label>
                            <input id="body" name="body" type="text" onChange={(e) => setFormData((oldData) => ({...oldData, body: e.target.value}))} value={formData['body']}/>
                            <button type="submit">Update</button>
                        </form>
                    </div>
                ) : <button onClick={() => setIsUpdating(true)}>Update</button> }
            </div>            
            <div className={error.type}>{ error.message }</div>             
        </>
    )
}

export default Details