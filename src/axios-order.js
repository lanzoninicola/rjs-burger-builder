import axios from 'axios';


const instance = axios.create(
    {
        baseURL: 'https://it-reactjs-burger-builder.firebaseio.com/',
        header: {
            'Access-Control-Allow-Origin': '*',
        }
    }
);

export default instance;