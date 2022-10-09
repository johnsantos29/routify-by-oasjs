// mock axios
const mockCreate = vi.fn();
vi.mock("axios", () => {
    return {
        default: { create: mockCreate },
    };
});

import { AxiosInstance } from "axios";
import { beforeEach, test, expect, vi } from "vitest";
import { getAxiosInstance, getAxiosConfig } from "../axios";
import * as aws from "../aws";

const axiosCreateMockCalls = mockCreate.mock.calls;
const mockAxiosCreate: AxiosInstance = {
    config: {
        url: "some-url",
    },
} as never;

beforeEach(() => {
    mockCreate.mockReturnValue(mockAxiosCreate);
});

test("set content-type headers", () => {
    getAxiosInstance();
    const expected = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    expect(axiosCreateMockCalls[0][0]).toEqual(expected);
});

test("returns an instance of axios", () => {
    const actual = getAxiosInstance();
    const expected = mockAxiosCreate;

    expect(actual).toEqual(expected);
});

test("throws an error if fails to get trip planner api key", async () => {
    vi.spyOn(aws, "getParameter").mockImplementationOnce(() => {
        throw new Error(aws.errorGetParameterStore);
    });

    await expect(getAxiosConfig("123")).rejects.toThrow(aws.errorGetParameterStore);
});

test("returns the axios config", async () => {
    const mockedAwsKey = "some-key";
    vi.spyOn(aws, "getParameter").mockResolvedValueOnce(mockedAwsKey);
    const expected = { headers: { Authorization: `apikey ${mockedAwsKey}` } };

    await expect(getAxiosConfig("123")).resolves.toStrictEqual(expected);
});
