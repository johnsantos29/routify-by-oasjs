export type Trip = {
    originId: string;
    destinationId: string;
    depOrArr: "dep" | "arr";
    tripDate: string | undefined;
    tripTime: string | undefined;
};

export type Departure = Pick<Trip, "originId" | "tripDate" | "tripTime">;

export type StopItem = {
    id: string;
    disassembledName: string;
    departureTimePlanned: string;
    arrivalTimePlanned: string;
};

export type LegItem = {
    transportation: {
        number: string;
        description: string;
    };
    stopSequence: Array<StopItem>;
};

export type JourneyItem = {
    interchanges: number;
    legs: Array<LegItem>;
};

export type Journeys = {
    journeys: Array<JourneyItem>;
};
