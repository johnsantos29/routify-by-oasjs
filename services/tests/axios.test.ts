// mock axios
const mockCreate = vi.fn();
vi.mock("axios", () => {
    return {
        default: { create: mockCreate },
    };
});

import { AxiosInstance } from "axios";
import { beforeEach, test, expect, it, vi } from "vitest";
import { getAxiosInstance } from "../utils/axios";

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
