import axios from 'axios';

export async function fetchImages(query) {
    const KEY = "33034788-7582eefcdc3a32a9d39f881fb";
    const URL = "https://pixabay.com/api/";
    const params = {
        key: KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    }

    try {
        const response = await axios.get(URL, { params });
        return response.data.hits;
    } catch (error) {
        console.log(error);
    }
}