import React, { SyntheticEvent, useEffect, useState } from 'react'
import { IItem } from '../../models/apiModels';
import { setItem } from '../../api/api';

function Create() {

    const [formData, setFormData] = useState<IItem>({
        title: '',
        body: '' 
    });
    const [error, setError] = useState<string>("");

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setError('');
        try {
            const response = await setItem({title: formData['title'], body: formData['body']});
            setError(`Your new item with the title "${response.title}" successfully added.`);
            setFormData({
                title: '',
                body: '' 
            })
        } catch {
            setError('An error occured :(. Please try later.');
        } 
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" onChange={(e) => setFormData((oldData) => ({...oldData, title: e.target.value}))} value={formData['title']} />
                <label htmlFor='body'>Body</label>
                <input id="body" name="body" type="text" onChange={(e) => setFormData((oldData) => ({...oldData, body: e.target.value}))} value={formData['body']}/>
                <button type="submit">Add Item</button>
            </form>
            <div>{ error }</div>
        </>
    )
}

export default Create