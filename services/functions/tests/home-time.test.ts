import { APIGatewayProxyEventV2 } from "aws-lambda";
import { test, expect, vi } from "vitest";
import * as aws from "../../utils/aws";
import { emptyRequestBody, undefinedStopId, handler as homeTime } from "../home-time";

const someId = "123";

const context = {} as never;
const cb = () => null;

test("throws emptyRequestBody error", async () => {
    const nullEvent = null as never;
    const nullBodyEvent: APIGatewayProxyEventV2 = {
        body: null,
    } as never;

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

    await expect(homeTime(undefinedStopIdEvent1, context, cb)).rejects.toThrow(undefinedStopId);
    await expect(homeTime(undefinedStopIdEvent2, context, cb)).rejects.toThrow(undefinedStopId);
});

test("throws errorGetParameterStore", async () => {
    const failedAxiosConfigEvent: APIGatewayProxyEventV2 = {
        body: JSON.stringify({ stopId: someId }),
    } as never;

    vi.spyOn(aws, "getParameter").mockImplementationOnce(() => {
        throw new Error(aws.errorGetParameterStore);
    });

    await expect(homeTime(failedAxiosConfigEvent, context, cb)).rejects.toThrow(aws.errorGetParameterStore);
});
