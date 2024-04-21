import React, { SyntheticEvent, useState, useEffect } from 'react';
import { IError, IItem } from '../../models/apiModels';
import { setItem } from '../../api/api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Create() {

    const errorInitialValue: IError = {
        type: 'error',
        message: ''
    };
    const [formData, setFormData] = useState<IItem>({
        title: '',
        body: '' 
    });
    const [error, setError] = useState<IError>(errorInitialValue);
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

    useEffect(() => {
        if (timeoutId) {
            return () => clearTimeout(timeoutId); 
        }
    }, [timeoutId])

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        if (formData['title'].trim() === '' || formData['body'].trim() === '') {
            setError({ type: 'error', message: 'Please enter your title and body for your post.' });
            return;
        }
        try {
            await setItem({title: formData['title'], body: formData['body']});
            setError({ type: 'success', message: 'The new item was successfully saved.' });
            setFormData({
                title: '',
                body: '' 
            });
            timeoutId = setTimeout(() => {
                window.location.href = '/';
            }, 3000)
        } catch {
            setError({ type: 'error', message: 'An error occured :(. Please try later.' });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField style={{marginBottom: '20px', minWidth: '500px'}} label="Title" variant="outlined" id="title" name="title" type="text" onChange={(e) => setFormData((oldData) => ({...oldData, title: e.target.value}))} value={formData['title']} />
                <br/>
                <TextField style={{marginBottom: '20px', minWidth: '500px'}} maxRows={4} label="Body" variant="outlined" multiline id="body" name="body" type="text" onChange={(e) => setFormData((oldData) => ({...oldData, body: e.target.value}))} value={formData['body']}/>
                <br/>
                <Button variant="contained" type="submit">Save</Button>
            </form>
            <Typography style={{marginTop: '20px'}} variant="body2" gutterBottom className={error.type}>{ error.message }</Typography>
        </>
    )
}

export default Create