import axios from "axios";

const url = "http://localhost:3000"
export const Fetchdata = async () => {
    try {
        const { data } = await axios.get(`${url}/products`)
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
    }
}

export const Getcartdata = async () => {
    try {
        const config = {
            method: 'get', url: `${url}/cart`, headers: {
                Authorization:
                    localStorage.getItem('Token'),
            }
        }
        const { data } = await axios(config)
        // console.log(data);
        return data
    } catch (error) {
        console.log(error);
    }
}

export const axioss = axios.create({ baseURL: 'http://localhost:3000' });
