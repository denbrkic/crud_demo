import React, { useState, useEffect, SyntheticEvent } from 'react';
import { IError, IItem } from '../../models/apiModels';
import { deleteItem, getItemDetails, updateItem } from '../../api/api';
import { useParams } from 'react-router-dom';
import './Details.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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
    const { id } = useParams();
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

    useEffect(() => {
        (async () => {
            try {
                const data = await getItemDetails(id as string);
                setItemDetails(data);
                setFormData(data);
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
            }, 3000);
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
            <Typography variant="h2" gutterBottom>Item Details:</Typography>
            <Box component="section" sx={{ p: 2, border: '1px dashed grey' }} className="content">
                <Typography variant="h3" gutterBottom>{itemDetails.title}</Typography>
                <Typography variant="body1" gutterBottom>{itemDetails.body}</Typography>
            </Box>
            <div>
                <Button variant="contained" style={{marginRight: '20px'}} onClick={handleDelete}>Delete</Button>
                { isUpdating ? (
                    <div>
                        <form onSubmit={handleSubmit} style={{margin: '40px 0'}}>
                            <TextField style={{marginBottom: '20px', minWidth: '500px'}} label="Title" variant="outlined" id="title" name="title" type="text" onChange={(e) => setFormData((oldData) => ({...oldData, title: e.target.value}))} value={formData['title']} />
                            <br/>
                            <TextField style={{marginBottom: '20px', minWidth: '500px'}} label="Body" variant="outlined" multiline id="body" name="body" type="text" onChange={(e) => setFormData((oldData) => ({...oldData, body: e.target.value}))} value={formData['body']}/>
                            <br/>
                            <Button variant="contained" type="submit">Update</Button>
                        </form>
                    </div>
                ) : <Button variant="contained" onClick={() => setIsUpdating(true)}>Update</Button> }
            </div>            
            <Typography style={{marginTop: '20px'}} variant="body2" gutterBottom className={error.type}>{ error.message }</Typography>             
        </>
    )
}

export default Details;