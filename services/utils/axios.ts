import axios, { AxiosRequestConfig } from "axios";
import { getParameter } from "../utils/aws";

export const getAxiosInstance = () => axios.create({ headers: { "Content-Type": "application/json" } });

export const getAxiosConfig = async (key: string): Promise<AxiosRequestConfig<any>> => {
    const apiKey = await getParameter(key);
    return { headers: { Authorization: `apikey ${apiKey}` } };
};
