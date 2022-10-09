// mock axios
const mockGet = vi.fn();
const mockCreate = vi.fn().mockReturnValue({
    get: mockGet,
});

vi.mock("axios", () => ({
    default: {
        create: mockCreate,
    },
    get: mockGet,
}));

import { test, expect, vi, beforeEach, afterEach } from "vitest";
import axios, { AxiosRequestConfig } from "axios";
import * as aws from "../aws";
import * as urls from "../urls";
import {
    getStopInfo,
    errorGetStopInfo,
    getJourneyListBetween2Locations,
    errorGetJourneyListBetween2Locations,
} from "../trip-planner";
import { Trip } from "../../../types/trip-planner";

// mock variables
const mockAxios = await vi.importMock<typeof axios>("axios");
let axiosGetMockCalls: [url: string, config?: AxiosRequestConfig<unknown>][];

const mockedResponse = {
    data: {
        sample: "data",
    },
};

const url = "some-url";
const mockedAwsKey = "some-key";

const someId = "123";
const axiosConfig = { headers: { Authorization: "sample-authorization" } };

// getStopInfo
beforeEach(() => {
    axiosGetMockCalls = mockAxios.get.mock.calls;
});

afterEach(() => {
    mockGet.mockClear();
});

test("getStopInfo - throws an error if axios get fails", async () => {
    vi.spyOn(aws, "getParameter").mockResolvedValueOnce(mockedAwsKey);
    vi.spyOn(urls, "getTripPlannerStopFinderUrl").mockReturnValueOnce(url);

    await expect(getStopInfo(someId, axiosConfig)).rejects.toThrow(errorGetStopInfo);
});

test("getStopInfo - calls the correct url and config", async () => {
    vi.spyOn(urls, "getTripPlannerStopFinderUrl").mockReturnValueOnce(url);

    mockGet.mockResolvedValueOnce(mockedResponse);

    const expectedUrl = url;
    const expectedConfig = axiosConfig;

    await getStopInfo(someId, axiosConfig);

    expect(axiosGetMockCalls[0][0]).toEqual(expectedUrl);
    expect(axiosGetMockCalls[0][1]).toStrictEqual(expectedConfig);
});

test("getStopInfo - returns retrieved data", async () => {
    mockGet.mockResolvedValueOnce(mockedResponse);

    await expect(getStopInfo(someId, axiosConfig)).resolves.toEqual({ sample: "data" });
});

// getJourneyListBetween2Locations
const trip: Trip = {
    originId: "123",
    destinationId: "456",
    depOrArr: "dep",
    tripDate: "123123",
    tripTime: "456456",
};

test("getJourneyListBetween2Locations - throws an error if axios get fails", async () => {
    vi.spyOn(aws, "getParameter").mockResolvedValueOnce(mockedAwsKey);
    vi.spyOn(urls, "getTripPlannerTripUrl").mockReturnValueOnce(url);

    await expect(getJourneyListBetween2Locations(trip, axiosConfig)).rejects.toThrow(
        errorGetJourneyListBetween2Locations
    );
});

test("getJourneyListBetween2Locations - calls the correct url and config", async () => {
    vi.spyOn(aws, "getParameter").mockResolvedValueOnce(mockedAwsKey);
    vi.spyOn(urls, "getTripPlannerTripUrl").mockReturnValueOnce(url);

    mockGet.mockResolvedValueOnce(mockedResponse);

    const expectedUrl = url;
    const expectedConfig = axiosConfig;

    await getJourneyListBetween2Locations(trip, axiosConfig);

    expect(axiosGetMockCalls[0][0]).toEqual(expectedUrl);
    expect(axiosGetMockCalls[0][1]).toStrictEqual(expectedConfig);
});

test("getJourneyListBetween2Locations - returns retrieved data", async () => {
    vi.spyOn(aws, "getParameter").mockResolvedValueOnce(mockedAwsKey);
    mockGet.mockResolvedValueOnce(mockedResponse);

    await expect(getJourneyListBetween2Locations(trip, axiosConfig)).resolves.toEqual({ sample: "data" });
});
