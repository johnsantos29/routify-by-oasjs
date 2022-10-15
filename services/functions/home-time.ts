import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getStopInfo, getJourneyListBetween2Locations, getDepartureInfo } from "../utils/trip-planner";
import { getAxiosConfig } from "../utils/axios";
import { Departure, Journeys, Trip } from "../../types/trip-planner";
import { config } from "../../config";
import { getStopNamesAll } from "../utils/journeys";

export const emptyRequestBody = "Empty request body.";
export const undefinedStopId = "Undefined stopId.";
export const undefinedTrip = "Undefined trip.";
export const undefinedDeparture = "Undefined departure info.";
export const emptyJourneysError = "No journeys found. Please check Trip parameters.";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    if (!event || !event.body) {
        throw new Error(emptyRequestBody);
    }

    const axiosConfig = await getAxiosConfig(config.tripPlannerKey);

    // for /stop_finder
    // const stopId: string = JSON.parse(event.body).stopId;
    // if (!stopId) {
    //     throw new Error(undefinedStopId);
    // }

    // const stopInfo = await getStopInfo(stopId, axiosConfig);

    // for /trip
    const trip: Trip = JSON.parse(event.body).trip;
    if (!trip) {
        throw new Error(undefinedTrip);
    }

    const journeyList: Journeys = await getJourneyListBetween2Locations(trip, axiosConfig);

    if (!journeyList.journeys) {
        throw new Error(emptyJourneysError);
    }

    const stopNamesAll = getStopNamesAll(journeyList);

    // const stopName

    // for /dep_mon
    // const dep: Departure = JSON.parse(event.body).departure;
    // if (!dep) {
    //     throw new Error(undefinedDeparture);
    // }

    // const departureInfo = await getDepartureInfo(dep, axiosConfig);

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stopNamesAll),
    };
};
