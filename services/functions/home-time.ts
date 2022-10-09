import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getStopInfo } from "../utils/trip-planner";
import { getAxiosConfig } from "../utils/axios";
import { config } from "../../config";

export const emptyRequestBody = "Empty request body.";
export const undefinedStopId = "Undefined stopId.";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    if (!event || !event.body) {
        throw new Error(emptyRequestBody);
    }

    const stopId: string = JSON.parse(event.body).stopId;
    if (!stopId) {
        throw new Error(undefinedStopId);
    }

    const axiosConfig = await getAxiosConfig(config.tripPlannerKey);

    const stopInfo = await getStopInfo(stopId, axiosConfig);

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stopInfo),
    };
};
