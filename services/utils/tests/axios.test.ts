// mock axios
const mockGet = vi.fn();
const mockCreate = vi.fn().mockReturnValue({
    get: mockGet,
});

vi.mock("axios", () => {
    return {
        default: { create: mockCreate },
        get: mockGet,
    };
});

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { beforeEach, test, expect, vi } from "vitest";
import { getAxiosInstance, getAxiosConfig, getResponseData } from "../axios";
import * as aws from "../aws";

// create
const axiosCreateMockCalls = mockCreate.mock.calls;
const mockAxiosCreate: AxiosInstance = {
    config: {
        url: "some-url",
    },
    get: mockGet,
} as never;

// get
const mockAxios = await vi.importMock<typeof axios>("axios");
let axiosGetMockCalls: [url: string, config?: AxiosRequestConfig<unknown>][];

// dummy vars
const someUrl = "some-url";
const axiosConfig = { headers: { Authorization: "sample-authorization" } };
const someErr = "some-error";
const mockedResponse = {
    data: {
        sample: "data",
    },
};

beforeEach(() => {
    mockCreate.mockReturnValue(mockAxiosCreate);
    axiosGetMockCalls = mockAxios.get.mock.calls;
});

test("getAxiosInstance - set content-type headers", () => {
    getAxiosInstance();
    const expected = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    expect(axiosCreateMockCalls[0][0]).toEqual(expected);
});

test("getAxiosInstance - returns an instance of axios", () => {
    const actual = getAxiosInstance();
    const expected = mockAxiosCreate;

    expect(actual).toEqual(expected);
});

test("getAxiosConfig - throws an error if fails to get trip planner api key", async () => {
    vi.spyOn(aws, "getParameter").mockImplementationOnce(() => {
        throw new Error(aws.errorGetParameterStore);
    });

    await expect(getAxiosConfig("123")).rejects.toThrow(aws.errorGetParameterStore);
});

test("getAxiosConfig - returns the axios config", async () => {
    const mockedAwsKey = "some-key";
    vi.spyOn(aws, "getParameter").mockResolvedValueOnce(mockedAwsKey);
    const expected = { headers: { Authorization: `apikey ${mockedAwsKey}` } };

    await expect(getAxiosConfig("123")).resolves.toStrictEqual(expected);
});

test("getResponseData - throws an error if axios get fails", async () => {
    await expect(getResponseData(someUrl, axiosConfig, someErr)).rejects.toThrow(someErr);
});

test("getResponseData - calls the correct url and config", async () => {
    mockGet.mockResolvedValueOnce(mockedResponse);

    const expectedUrl = someUrl;
    const expectedConfig = axiosConfig;

    await getResponseData(someUrl, axiosConfig, someErr);

    expect(axiosGetMockCalls[0][0]).toEqual(expectedUrl);
    expect(axiosGetMockCalls[0][1]).toStrictEqual(expectedConfig);
});

test("getResponseData - returns retrieved data", async () => {
    mockGet.mockResolvedValueOnce(mockedResponse);

    await expect(getResponseData(someUrl, axiosConfig, someErr)).resolves.toEqual({ sample: "data" });
});
