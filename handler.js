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
