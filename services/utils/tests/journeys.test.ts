import { test, expect } from "vitest";
import { JourneyItem, Journeys, LegItem } from "../../../types/trip-planner";
import { getNumInterchange, getStopNames, getStopNamesAll } from "../journeys";

const leg1: LegItem = {
    transportation: { number: "num1", description: "desc1" },
    stopSequence: [
        {
            id: "",
            disassembledName: "Campbelltown",
            departureTimePlanned: "",
            arrivalTimePlanned: "",
        },
        {
            id: "",
            disassembledName: "Leumeah",
            departureTimePlanned: "",
            arrivalTimePlanned: "",
        },
        {
            id: "",
            disassembledName: "Minto",
            departureTimePlanned: "",
            arrivalTimePlanned: "",
        },
    ],
};

const leg2: LegItem = {
    transportation: { number: "num2", description: "desc2" },
    stopSequence: [
        {
            id: "",
            disassembledName: "Ingleburn",
            departureTimePlanned: "",
            arrivalTimePlanned: "",
        },
        {
            id: "",
            disassembledName: "Glenfield",
            departureTimePlanned: "",
            arrivalTimePlanned: "",
        },
    ],
};

const journeyItem1: JourneyItem = {
    interchanges: 0,
    legs: [leg1],
};

const journeyItem2: JourneyItem = {
    interchanges: 1,
    legs: [leg1, leg2],
};

const journeys: Journeys = {
    journeys: [journeyItem1, journeyItem2],
};

test("getNumInterchange", () => {
    expect(getNumInterchange(journeyItem2)).toEqual(1);
});

test("getStopNames", () => {
    const expected = ["Campbelltown", "Leumeah", "Minto"];

    expect(getStopNames(leg1)).toStrictEqual(expected);
});

test("getStopNamesAll", () => {
    const expected = [
        ["Campbelltown", "Leumeah", "Minto"],
        ["Campbelltown", "Leumeah", "Minto", "Ingleburn", "Glenfield"],
    ];

    expect(getStopNamesAll(journeys)).toStrictEqual(expected);
});
