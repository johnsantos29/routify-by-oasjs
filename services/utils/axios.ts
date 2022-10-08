import axios from 'axios';

export const getAxiosInstance = () => axios.create({ headers: { 'Content-Type': 'application/json' } });
