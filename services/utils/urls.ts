import { Departure, Trip } from "../../types/trip-planner";

export const baseTNSWUrl = "https://api.transport.nsw.gov.au/v1/";

export const getTripPlannerStopFinderUrl = (stopId: string) => {
    return (
        `${baseTNSWUrl}tp/stop_finder?outputFormat=rapidJSON` +
        `&type_sf=stop&name_sf=${stopId}&coordOutputFormat=EPSG%3A4326` +
        `&TfNSWSF=true&version=10.2.1.42`
    );
};

export const getTripPlannerTripUrl = (trip: Trip) => {
    return (
        `${baseTNSWUrl}tp/trip?outputFormat=rapidJSON` +
        `&coordOutputFormat=EPSG%3A4326&depArrMacro=${trip.depOrArr}` +
        `&itdDate=${trip.tripDate}&itdTime=${trip.tripTime}&type_origin=any` +
        `&name_origin=${trip.originId}&type_destination=any` +
        `&name_destination=${trip.destinationId}&calcNumberOfTrips=6&TfNSWTR=true` +
        `&version=10.2.1.42&itOptionsActive=1&cycleSpeed=16`
    );
};

export const getTripPlannerDepartureInfoUrl = (dep: Departure) => {
    return (
        `${baseTNSWUrl}tp/departure_mon?outputFormat=rapidJSON` +
        `&coordOutputFormat=EPSG%3A4326&mode=direct&type_dm=stop` +
        `&name_dm=${dep.originId}&itdDate=${dep.tripDate}&itdTime=${dep.tripTime}` +
        `&departureMonitorMacro=true&TfNSWDM=true&version=10.2.1.42`
    );
};
