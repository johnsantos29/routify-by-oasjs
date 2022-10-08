import { SecretsStack } from "./secrets";
import { use, Stack, StackContext, Api, Function } from "@serverless-stack/resources";
import { CustomDomain, ApiHandlers } from "../types/routify";

const permissions = ["events", "ssm", "rds-data"];

// api construct
const routifyApi = (stack: Stack, handlers: ApiHandlers, domain: CustomDomain) =>
    new Api(stack, "routifyApi", {
        customDomain: {
            domainName: domain.domainName,
            hostedZone: domain.hostedZone,
        },
        routes: {
            "GET /home-time": handlers.homeTimeHandler,
        },
    });

export const APIStack = ({ app, stack }: StackContext) => {
    // const { vpcId } = use(SecretsStack);

    // lambdas
    const homeTimeHandler = new Function(stack, "homeTime", {
        architecture: "arm_64",
        memorySize: "256 MB",
        runtime: "nodejs16.x",
        handler: "functions/home-time.handler",
        permissions,
    });

    const domain = {
        domainName: "api.oasjs.com",
        hostedZone: "oasjs.com",
    };

    // http api
    const api = routifyApi(stack, { homeTimeHandler }, domain);

    // show the endpoint in the output
    stack.addOutputs({
        ApiEndpoint: api.url,
    });
};
