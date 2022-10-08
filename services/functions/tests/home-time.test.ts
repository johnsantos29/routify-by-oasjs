import { APIGatewayProxyEventV2 } from "aws-lambda";
import { test, expect } from "vitest";
import { emptyRequestBody, undefinedStopId, handler as homeTime } from "../home-time";

test("throws emptyRequestBody error", async () => {
    const nullEvent = null as never;
    const nullBodyEvent: APIGatewayProxyEventV2 = {
        body: null,
    } as never;

    const context = {} as never;
    const cb = () => null;

    await expect(homeTime(nullEvent, context, cb)).rejects.toThrow(emptyRequestBody);
    await expect(homeTime(nullBodyEvent, context, cb)).rejects.toThrow(emptyRequestBody);
});

test("throws undefinedStopId error", async () => {
    const undefinedStopIdEvent1: APIGatewayProxyEventV2 = {
        body: JSON.stringify({}),
    } as never;

    const undefinedStopIdEvent2: APIGatewayProxyEventV2 = {
        body: JSON.stringify({ noStopId: true }),
    } as never;

    const context = {} as never;
    const cb = () => null;

    await expect(homeTime(undefinedStopIdEvent1, context, cb)).rejects.toThrow(undefinedStopId);
    await expect(homeTime(undefinedStopIdEvent2, context, cb)).rejects.toThrow(undefinedStopId);
});
