import { IItem } from "../models/apiModels";

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export async function getAllItems() {
    const resource = 'posts';
    const res = await fetch(BASE_URL + resource, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await res.json()
}

export async function getItemDetails(id: string) {
    const resource = 'posts/:id';
    const res = await fetch(BASE_URL + resource.replace(':id', id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await res.json()
}

export async function setItem(item: IItem) {
    const resource = 'posts';
    const res = await fetch(BASE_URL + resource, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })    
    return await res.json()
}

export async function deleteItem(id: string) {
    const resource = 'posts/:id';
    const res = await fetch(BASE_URL + resource.replace(':id', id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })    
    return await res.json()
}

export async function updateItem(item: IItem) {
    const resource = 'posts/:id';
    const res = await fetch(BASE_URL + resource.replace(':id', String(item?.id)), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })    
    return await res.json()
}
