import React, { SyntheticEvent, useState, useEffect } from 'react'
import { IError, IItem } from '../../models/apiModels';
import { setItem } from '../../api/api';
import './Create.css';

function Create() {

    const [formData, setFormData] = useState<IItem>({
        title: '',
        body: '' 
    });
    const [error, setError] = useState<IError>({
        type: 'error',
        message: ''
    });
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

    useEffect(() => {
        if (timeoutId) {
            return () => clearTimeout(timeoutId); 
        }
    }, [timeoutId])

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setError({
            type: 'error',
            message: ''
        });
        try {
            const response = await setItem({title: formData['title'], body: formData['body']});
            setError({ type: 'success', message: `Your new item with the title "${response.title}" successfully added.` });
            setFormData({
                title: '',
                body: '' 
            });
            timeoutId = setTimeout(() => {
                window.location.href = '/';
            }, 5000)
        } catch {
            setError({ type: 'error', message: 'An error occured :(. Please try later.' });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" onChange={(e) => setFormData((oldData) => ({...oldData, title: e.target.value}))} value={formData['title']} />
                <label htmlFor='body'>Body</label>
                <input id="body" name="body" type="text" onChange={(e) => setFormData((oldData) => ({...oldData, body: e.target.value}))} value={formData['body']}/>
                <button type="submit">Save</button>
            </form>
            <div className={error.type}>{ error.message }</div>
        </>
    )
}

export default Create