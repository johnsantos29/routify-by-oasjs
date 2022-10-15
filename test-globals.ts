import { afterAll, beforeAll } from "vitest";
import { LegItem, JourneyItem, Journeys } from "./types/trip-planner";

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

beforeAll(() => {
    global.leg1 = leg1;
    global.leg2 = leg2;
    global.journeyItem1 = journeyItem1;
    global.journeyItem2 = journeyItem2;
    global.journeys = journeys;
});

afterAll(() => {
    delete global.leg1;
    delete global.leg2;
    delete global.journeyItem1;
    delete global.journeyItem2;
    delete global.journeys;
});
