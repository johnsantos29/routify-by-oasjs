export const baseTNSWUrl = "https://api.transport.nsw.gov.au/v1/";

export const getTripPlannerStopFinderUrl = (stopId: string) => {
    return `${baseTNSWUrl}/tp/stop_finder?outputFormat=rapidJSON&type_sf=stop&name_sf=${stopId}&coordOutputFormat=EPSG%3A4326&TfNSWSF=true&version=10.2.1.42`;
};
