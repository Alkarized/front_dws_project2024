import axios from "axios";

const BASE_URL = 'https://url.com';

export const testSegment = async () => {
    return await axios.post(BASE_URL + "/test", "{}");
};


