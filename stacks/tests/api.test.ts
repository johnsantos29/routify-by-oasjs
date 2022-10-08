import { test, expect } from "vitest";
import { Template } from "aws-cdk-lib/assertions";
import { App, getStack } from "@serverless-stack/resources";
import { APIStack } from "../api";

test("the creation of API Stack", () => {
    const app = new App();
    app.stack(APIStack);

    // get template

    const apiStack = getStack(APIStack);
    const apiTemplate = Template.fromStack(apiStack);

    expect(apiTemplate.toJSON()).toMatchSnapshot();
});
