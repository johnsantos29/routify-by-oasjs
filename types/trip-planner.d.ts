export type Trip = {
    originId: string;
    destinationId: string;
    depOrArr: "dep" | "arr";
    tripDate: string | undefined;
    tripTime: string | undefined;
};
