import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getJourneyListBetween2Locations } from "../utils/trip-planner";
import { getAxiosConfig } from "../utils/axios";
import { Journeys, Trip } from "../../types/trip-planner";
import { config } from "../../config";
import { getStopNamesAll } from "../utils/journeys";

export const emptyRequestBody = "Empty request body.";
export const undefinedTrip = "Undefined trip.";
export const emptyJourneysError = "No journeys found. Please check Trip parameters.";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    if (!event || !event.body) {
        throw new Error(emptyRequestBody);
    }

    const axiosConfig = await getAxiosConfig(config.tripPlannerKey);

    const trip: Trip = JSON.parse(event.body).trip;
    if (!trip) {
        throw new Error(undefinedTrip);
    }

    const journeyList: Journeys = await getJourneyListBetween2Locations(trip, axiosConfig);

    if (!journeyList.journeys) {
        throw new Error(emptyJourneysError);
    }

    const stopNamesAll = getStopNamesAll(journeyList);

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stopNamesAll),
    };
};
