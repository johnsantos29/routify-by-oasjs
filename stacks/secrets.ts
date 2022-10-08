import { Config, StackContext } from "@serverless-stack/resources";

export const SecretsStack = ({ stack }: StackContext) => {
    const VPC_ID = new Config.Secret(stack, "VPC_ID");
    return { vpcId: VPC_ID };
};
