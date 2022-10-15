import { JourneyItem, Journeys, LegItem } from "../../types/trip-planner";

export const getNumInterchange = (journeyItem: JourneyItem): number => {
    return journeyItem.interchanges;
};

export const getStopNames = (legItem: LegItem): string[] => {
    return legItem.stopSequence.map((stop) => stop.disassembledName);
};

export const getStopNamesAll = (journeys: Journeys) => {
    const stopNamesAll: string[][] = [];

    for (const journey of journeys.journeys) {
        if (journey.interchanges === 0) {
            stopNamesAll.push(getStopNames(journey.legs[0]));
        } else if (journey.interchanges > 0) {
            const stopNames = journey.legs.map((leg) => getStopNames(leg));
            stopNamesAll.push(stopNames.flat());
        }
    }

    return stopNamesAll;
};
