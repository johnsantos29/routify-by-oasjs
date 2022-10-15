import { test, expect } from "vitest";
import { getNumInterchange, getPlatform, getStopNames, getStopNamesAll } from "../journeys";

test("getNumInterchange", () => {
    // @ts-expect-error type
    expect(getNumInterchange(journeyItem2)).toEqual(1);
});

test("getStopNames", () => {
    const expected = ["Campbelltown", "Leumeah", "Minto"];
    // @ts-expect-error type
    expect(getStopNames(leg1)).toStrictEqual(expected);
});

test("getStopNamesAll", () => {
    const expected = [
        ["Campbelltown", "Leumeah", "Minto"],
        ["Campbelltown", "Leumeah", "Minto", "Ingleburn", "Glenfield"],
    ];
    // @ts-expect-error type
    expect(getStopNamesAll(journeys)).toStrictEqual(expected);
});

test("getPlatform", () => {
    const disassembledName = "Campbelltown Station, Platform 1";
    const expected = "Platform 1";
    expect(getPlatform(disassembledName)).toEqual(expected);
});
