import { getTripPlannerDepartureInfoUrl, getTripPlannerStopFinderUrl, getTripPlannerTripUrl } from "./urls";
import { getResponseData } from "./axios";
import { Trip, Departure, Journeys } from "../../types/trip-planner";
import { AxiosRequestConfig } from "axios";

export const errorGetStopInfo = "Failed - getStopInfo";
export const errorGetJourneyListBetween2Locations = "Failed - getJourneyListBetween2Locations";
export const errorGetDepartureInfo = "Failed - getJourneygetDepartureInfo";

export const getStopInfo = async (stopId: string, axiosConfig: AxiosRequestConfig) => {
    const url = getTripPlannerStopFinderUrl(stopId);
    return await getResponseData(url, axiosConfig, errorGetStopInfo);
};

export const getJourneyListBetween2Locations = async (
    trip: Trip,
    axiosConfig: AxiosRequestConfig
): Promise<Journeys> => {
    const url = getTripPlannerTripUrl(trip);
    return await getResponseData(url, axiosConfig, errorGetJourneyListBetween2Locations);
};

export const getDepartureInfo = async (dep: Departure, axiosConfig: AxiosRequestConfig) => {
    const url = getTripPlannerDepartureInfoUrl(dep);
    return await getResponseData(url, axiosConfig, errorGetDepartureInfo);
};
