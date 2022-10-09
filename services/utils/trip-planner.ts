import { getTripPlannerStopFinderUrl, getTripPlannerTripUrl } from "./urls";
import { getResponseData } from "./axios";
import { Trip } from "../../types/trip-planner";
import { AxiosRequestConfig } from "axios";

export const errorGetStopInfo = "Failed - getStopInfo";
export const errorGetJourneyListBetween2Locations = "Failed - getJourneyListBetween2Locations";

export const getStopInfo = async (stopId: string, axiosConfig: AxiosRequestConfig) => {
    const url = getTripPlannerStopFinderUrl(stopId);
    return await getResponseData(url, axiosConfig, errorGetStopInfo);
};

export const getJourneyListBetween2Locations = async (trip: Trip, axiosConfig: AxiosRequestConfig) => {
    const url = getTripPlannerTripUrl(trip);
    return await getResponseData(url, axiosConfig, errorGetJourneyListBetween2Locations);
};
