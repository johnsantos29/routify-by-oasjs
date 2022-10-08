import * as aws from "aws-sdk";

export const errorGetParameterStore = "Error retrieving from parameter store";

export const getParameter = async (parameterName: string): Promise<string | undefined> => {
    const params = {
        Name: parameterName,
        WithDecryption: true,
    };

    const ssm = new aws.SSM();

    try {
        const paramValue = await ssm.getParameter(params).promise();
        return paramValue?.Parameter?.Value;
    } catch (err) {
        throw new Error(errorGetParameterStore);
    }
};
