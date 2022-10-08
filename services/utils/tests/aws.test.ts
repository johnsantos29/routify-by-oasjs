import { test, beforeEach, expect, vi, afterEach } from "vitest";
import * as aws from "../aws";
import { errorGetParameterStore } from "../aws";

// mock aws-sdk SSM
const mockedGetParameter = vi.fn();

vi.mock("aws-sdk", () => {
    const mockedConfig = { update: vi.fn() };
    const mockedSsm = vi.fn(() => ({
        getParameter: mockedGetParameter,
    }));

    return {
        SSM: mockedSsm,
        config: mockedConfig,
    };
});

let mockedParamName;

beforeEach(() => {
    mockedParamName = "some-name";
});

afterEach(() => {
    mockedGetParameter.mockClear();
});

test("getParameter returns the parameter stored", async () => {
    const mockedValue = "some-value";
    const mockedResponseData = { Parameter: { Value: mockedValue } };

    mockedGetParameter.mockImplementation(() => ({
        promise: vi.fn().mockResolvedValue(mockedResponseData),
    }));

    const actual = await aws.getParameter(mockedParamName);
    const expected = mockedValue;

    expect(actual).toEqual(expected);
});

test("getParameter returns undefined if parameter does not exist", async () => {
    const mockedResponseData = { Parameter: { Value: undefined } };
    mockedGetParameter.mockImplementation(() => ({
        promise: vi.fn().mockResolvedValue(mockedResponseData),
    }));

    const actual = await aws.getParameter(mockedParamName);

    expect(actual).toBeUndefined();
});

test("getParameter returns undefined if no response data", async () => {
    const mockedResponseData = undefined;
    mockedGetParameter.mockImplementation(() => ({
        promise: vi.fn().mockResolvedValue(mockedResponseData),
    }));

    const actual = await aws.getParameter(mockedParamName);

    expect(actual).toBeUndefined();
});

test("getParameter throws an error if unable to retrieve params", async () => {
    mockedGetParameter.mockImplementation(() => {
        throw new Error();
    });

    await expect(aws.getParameter(mockedParamName)).rejects.toThrow(errorGetParameterStore);
});
