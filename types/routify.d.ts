import { ApiRouteProps } from "@serverless-stack/resources";

export type CustomDomain = {
    hostedZone: string;
    domainName: string;
};

export type ApiHandlers = {
    homeTimeHandler: ApiRouteProps<string>;
};
