import { DomainName } from "@aws-cdk/aws-apigatewayv2-alpha";
import { Stack, StackContext, Api, Function } from "@serverless-stack/resources";
import { ApiRouteProps } from "@serverless-stack/resources";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { CustomDomain } from "../types/routify";

const permissions = ["events", "ssm", "rds-data"];

const regionalHostedZoneId = "Z101437430JZRC0N3OOPR";

// lambdas
const routifyFunction = (vpc: ec2.IVpc, stack: Stack) =>
    new Function(stack, "routifyFunction", {
        architecture: "arm_64",
        memorySize: "256 MB",
        runtime: "nodejs16.x",
        handler: "functions/routify.handler",
        permissions,
        vpc,
        vpcSubnets: { subnets: vpc.publicSubnets },
    });

// api construct
const routifyApi = (stack: Stack, handler: ApiRouteProps<string>, domain: CustomDomain) =>
    new Api(stack, "routifyApi", {
        customDomain: {
            cdk: {
                domainName: DomainName.fromDomainNameAttributes(stack, domain.domainName, {
                    name: domain.domainName,
                    regionalDomainName: "",
                    regionalHostedZoneId,
                }),
            },
        },
    });
