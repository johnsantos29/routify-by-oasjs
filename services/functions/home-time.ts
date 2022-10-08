import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: event.body,
    };
};
