import { APIGatewayProxyEventV2 } from "aws-lambda";
import { test, expect, vi } from "vitest";
import * as aws from "../../utils/aws";
import * as tripPlanner from "../../utils/trip-planner";
import { emptyRequestBody, undefinedTrip, emptyJourneysError, handler as homeTime } from "../home-time";

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

test("throws errorGetParameterStore", async () => {
    const failedAxiosConfigEvent: APIGatewayProxyEventV2 = {
        body: JSON.stringify({ stopId: someId }),
    } as never;

    vi.spyOn(aws, "getParameter").mockImplementationOnce(() => {
        throw new Error(aws.errorGetParameterStore);
    });

    await expect(homeTime(failedAxiosConfigEvent, context, cb)).rejects.toThrow(aws.errorGetParameterStore);
});

test("throws undefined trip", async () => {
    const failedAxiosConfigEvent: APIGatewayProxyEventV2 = {
        body: JSON.stringify({ stopId: someId }),
    } as never;

    vi.spyOn(aws, "getParameter").mockResolvedValueOnce("some-key");

    await expect(homeTime(failedAxiosConfigEvent, context, cb)).rejects.toThrow(undefinedTrip);
});

test("throws emptyJourneysError", async () => {
    const event: APIGatewayProxyEventV2 = {
        body: JSON.stringify({ trip: {} }),
    } as never;

    vi.spyOn(aws, "getParameter").mockResolvedValueOnce("some-key");
    vi.spyOn(tripPlanner, "getJourneyListBetween2Locations").mockResolvedValueOnce({} as never);

    await expect(homeTime(event, context, cb)).rejects.toThrow(emptyJourneysError);
});

test("returns response with all the stop names", async () => {
    const event: APIGatewayProxyEventV2 = {
        body: JSON.stringify({ trip: {} }),
    } as never;

    vi.spyOn(aws, "getParameter").mockResolvedValueOnce("some-key");
    // @ts-expect-error type
    vi.spyOn(tripPlanner, "getJourneyListBetween2Locations").mockResolvedValueOnce(journeys as never);

    const expected = {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
            ["Campbelltown", "Leumeah", "Minto"],
            ["Campbelltown", "Leumeah", "Minto", "Ingleburn", "Glenfield"],
        ]),
    };

    await expect(homeTime(event, context, cb)).resolves.toEqual(expected);
});
