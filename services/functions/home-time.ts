import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getStopInfo } from "../utils/trip-planner";

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

    const stopInfo = await getStopInfo(stopId);

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stopInfo),
    };
};
