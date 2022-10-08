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
import * as aws from "../utils/aws";
import * as urls from "../utils/urls";
import { getStopInfo } from "../utils/trip-planner";

const mockAxios = await vi.importMock<typeof axios>("axios");
let axiosGetMockCalls: [url: string, config?: AxiosRequestConfig<unknown>][];

beforeEach(() => {
    axiosGetMockCalls = mockAxios.get.mock.calls;
});

afterEach(() => {
    mockGet.mockClear();
});

test("getStopInfo - throws an error if fails to get trip planner api key", async () => {
    vi.spyOn(aws, "getParameter").mockImplementationOnce(() => {
        throw new Error(aws.errorGetParameterStore);
    });

    await expect(getStopInfo("123")).rejects.toThrow(aws.errorGetParameterStore);
});

test("getStopInfo - throws an error if axios get fails", async () => {
    const url = "some-url";

    vi.spyOn(aws, "getParameter").mockResolvedValueOnce("some-key");
    vi.spyOn(urls, "getTripPlannerStopFinderUrl").mockReturnValueOnce(url);

    await expect(getStopInfo("123")).rejects.toThrow(`Failed - GET request to ${url}`);
});

test("getStopInfo - calls the correct url and config", async () => {
    const mockedResponse = {
        data: {
            sample: "data",
        },
    };

    vi.spyOn(aws, "getParameter").mockResolvedValueOnce("some-key");
    vi.spyOn(urls, "getTripPlannerStopFinderUrl").mockReturnValueOnce("some-url");

    mockGet.mockResolvedValueOnce(mockedResponse);

    const expectedUrl = "some-url";
    const expectedConfig = {
        headers: {
            Authorization: `Bearer some-key`,
        },
    };

    await getStopInfo("123");

    expect(axiosGetMockCalls[0][0]).toEqual(expectedUrl);
    expect(axiosGetMockCalls[0][1]).toStrictEqual(expectedConfig);
});

test("getStopInfo - returns retrieved data", async () => {
    const mockedResponse = {
        data: {
            sample: "data",
        },
    };

    vi.spyOn(aws, "getParameter").mockResolvedValueOnce("some-key");
    mockGet.mockResolvedValueOnce(mockedResponse);

    await expect(getStopInfo("123")).resolves.toEqual({ sample: "data" });
});
