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

