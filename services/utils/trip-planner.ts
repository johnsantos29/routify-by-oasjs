import { getParameter } from "../utils/aws";
import { getTripPlannerStopFinderUrl, getTripPlannerTripUrl } from "./urls";
import { getAxiosInstance } from "./axios";
import { Trip } from "../../types/trip-planner";
import { AxiosRequestConfig } from "axios";

export const errorGetStopInfo = "Failed - getStopInfo";
export const errorGetJourneyListBetween2Locations = "Failed - getJourneyListBetween2Locations";

export const getStopInfo = async (stopId: string, axiosConfig: AxiosRequestConfig) => {
    const axiosInstance = getAxiosInstance();

    const url = getTripPlannerStopFinderUrl(stopId);

    try {
        const response = await axiosInstance.get(url, axiosConfig);
        return response.data;
    } catch (err) {
        throw new Error(errorGetStopInfo);
    }
};

export const getJourneyListBetween2Locations = async (trip: Trip, axiosConfig: AxiosRequestConfig) => {
    const axiosInstance = getAxiosInstance();

    const url = getTripPlannerTripUrl(trip);
    try {
        const response = await axiosInstance.get(url, axiosConfig);
        return response.data;
    } catch (err) {
        throw new Error(errorGetJourneyListBetween2Locations);
    }
};
