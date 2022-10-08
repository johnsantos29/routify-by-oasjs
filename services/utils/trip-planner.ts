import { getParameter } from "../utils/aws";
import { config } from "../../config";
import { getTripPlannerStopFinderUrl, getTripPlannerTripUrl } from "./urls";
import { getAxiosInstance } from "./axios";
import { Trip } from "../../types/trip-planner";

export const errorGetStopInfo = "Failed - getStopInfo";
export const errorGetJourneyListBetween2Locations = "Failed - getJourneyListBetween2Locations";

export const getStopInfo = async (stopId: string) => {
    // TODO: refactor - in lambda
    const tripPlannerApiKey = await getParameter(config.tripPlannerKey);

    const axiosInstance = getAxiosInstance();
    const axiosConfig = {
        headers: { Authorization: `apikey ${tripPlannerApiKey}` },
    };

    const url = getTripPlannerStopFinderUrl(stopId);

    try {
        const response = await axiosInstance.get(url, axiosConfig);
        return response.data;
    } catch (err) {
        throw new Error(errorGetStopInfo);
    }
};

export const getJourneyListBetween2Locations = async (trip: Trip) => {
    // TODO: refactor - in lambda
    const tripPlannerApiKey = await getParameter(config.tripPlannerKey);

    const axiosInstance = getAxiosInstance();
    const axiosConfig = {
        headers: { Authorization: `apikey ${tripPlannerApiKey}` },
    };

    const url = getTripPlannerTripUrl(trip);
    try {
        const response = await axiosInstance.get(url, axiosConfig);
        return response.data;
    } catch (err) {
        throw new Error(errorGetJourneyListBetween2Locations);
    }
};
