import axios, { AxiosRequestConfig } from "axios";
import { getParameter } from "../utils/aws";

export const getAxiosInstance = () => axios.create({ headers: { "Content-Type": "application/json" } });

export const getAxiosConfig = async (key: string): Promise<AxiosRequestConfig<any>> => {
    const apiKey = await getParameter(key);
    return { headers: { Authorization: `apikey ${apiKey}` } };
};

export const getResponseData = async (url: string, axiosConfig: AxiosRequestConfig, customErrorMessage: string) => {
    const axiosInstance = getAxiosInstance();

    try {
        const response = await axiosInstance.get(url, axiosConfig);
        return response.data;
    } catch (err) {
        throw new Error(customErrorMessage);
    }
};
