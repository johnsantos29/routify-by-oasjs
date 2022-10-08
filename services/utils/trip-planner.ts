import { getParameter } from "../utils/aws";
import { config } from "../../config";
import { getTripPlannerStopFinderUrl } from "./urls";
import { getAxiosInstance } from "./axios";

export const getStopInfo = async (stopId: string) => {
    const tripPlannerApiKey = await getParameter(config.tripPlannerKey);

    const axiosInstance = getAxiosInstance();
    const axiosConfig = {
        headers: { Authorization: `apikey ${tripPlannerApiKey}` },
    };

    const url = getTripPlannerStopFinderUrl(stopId);
    console.log(url);

    try {
        const response = await axiosInstance.get(url, axiosConfig);
        return response.data;
    } catch (err) {
        throw new Error(`Failed - GET request to ${url}`);
    }
};
