'use strict';

module.exports.webhook = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Datadog ❤️ Serverless!",
                input: event,
            },
            null,
            2
        ),
    };
};


// import our dependencies
const { Octokit } = require("@octokit/core");
const { createAppAuth } = require("@octokit/auth-app");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const dynamoDbClient = new DynamoDBClient({
    region: "us-east-1",
});

module.exports.webhook = async (event) => {
    // parse the incoming event
    const body = JSON.parse(event.body);
    // let's make sure that we're dealing with a 'open an issue' event
    if (body.action !== "opened") {
        return {
            statusCode: 200,
        };
    }
    // retrieve auth PEM and app installation details to generate a token
    const data = await dynamoDbClient.send(
        new ScanCommand({
            TableName: "serverless_dash_workshop",
        })
    );
    const firstItem = unmarshall(data.Items[0]);

    const installationOctokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
            appId: firstItem.app_id,
            privateKey: firstItem.pem,
            installationId: body.installation.id,
        },
    });
    // post the comment ! 🔥
    try {
        await installationOctokit.request(
            "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
            {
                owner: body.issue.user.login,
                repo: body.repository.name,
                issue_number: body.issue.number,
                body: "hello from a Lambda-powered Github App 🔥",
            }
        );
        return {
            statusCode: 200,
        };
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
        };
    }
};
