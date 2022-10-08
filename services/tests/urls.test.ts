import { test, expect } from "vitest";
import { baseTNSWUrl, getTripPlannerStopFinderUrl } from "../utils/urls";

test("returns the correct stop_finder URL", () => {
    const stopId = "12345";
    const expected = `${baseTNSWUrl}/tp/stop_finder?outputFormat=rapidJSON&type_sf=stop&name_sf=${stopId}&coordOutputFormat=EPSG%3A4326&TfNSWSF=true&version=10.2.1.42`;
    expect(getTripPlannerStopFinderUrl(stopId)).toEqual(expected);
});
