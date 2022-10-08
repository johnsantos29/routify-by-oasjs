import { test, expect } from "vitest";
import { Template } from "aws-cdk-lib/assertions";
import { App, getStack } from "@serverless-stack/resources";
import { SecretsStack } from "../secrets";

test("the creation of SecretsStack", () => {
    const app = new App();
    app.stack(SecretsStack);

    const stack = getStack(SecretsStack);
    const template = Template.fromStack(stack);

    expect(template.toJSON()).toMatchSnapshot();
});
