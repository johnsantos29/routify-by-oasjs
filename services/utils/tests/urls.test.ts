import { test, expect } from "vitest";
import { Trip } from "../../../types/trip-planner";
import { baseTNSWUrl, getTripPlannerStopFinderUrl, getTripPlannerTripUrl } from "../urls";

test("returns the correct stop_finder URL", () => {
    const stopId = "12345";
    const expected = `${baseTNSWUrl}tp/stop_finder?outputFormat=rapidJSON&type_sf=stop&name_sf=${stopId}&coordOutputFormat=EPSG%3A4326&TfNSWSF=true&version=10.2.1.42`;
    expect(getTripPlannerStopFinderUrl(stopId)).toEqual(expected);
});

test("returns the correct trip URL", () => {
    const trip: Trip = {
        originId: "123",
        destinationId: "456",
        depOrArr: "dep",
        tripDate: "123123",
        tripTime: "456456",
    };
    const expected =
        `${baseTNSWUrl}tp/trip?outputFormat=rapidJSON` +
        "&coordOutputFormat=EPSG%3A4326&depArrMacro=dep" +
        "&itdDate=123123&itdTime=456456&type_origin=any" +
        "&name_origin=123&type_destination=any" +
        "&name_destination=456&calcNumberOfTrips=6&TfNSWTR=true" +
        "&version=10.2.1.42&itOptionsActive=1&cycleSpeed=16";

    expect(getTripPlannerTripUrl(trip)).toEqual(expected);
});
