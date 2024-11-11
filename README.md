Serverless GitHub Bot with Datadog Integration
----------------------------------------------

This project demonstrates the setup of a serverless webhook application deployed to AWS, using the Serverless Framework. The application is integrated with Datadog to monitor serverless services on AWS, including Lambda functions triggered by GitHub webhooks.

Prerequisites
-------------
Datadog account (trial account details provided in the terminal)
AWS Account with Console access
Serverless Framework installed locally (npm install -g serverless)

Setup Instructions
---------------------

1. Setting Up the Lab Environment
   ------------------------------
Log in to your Datadog trial account using the credentials provided in the terminal (creds command).
Log in to your AWS Console with the provided credentials, selecting the us-east-1 region.
Open the IDE tab in your lab environment to view the project files.

2. Installing and Configuring the Serverless Application
   -----------------------------------------------------

-Clone and navigate to the project repository:



serverless install --url https://github.com/DataDog/serverless-dash-github-bot

cd serverless-dash-github-bot

-Open serverless.yml in the IDE and update the service name:

yaml

service: serverless-github-bot

Update the function name and configure HTTP trigger:




functions:

  webhook:
  
    handler: handler.webhook
	
    events:
	
      - httpApi:
	  
          path: /webhook
		  
          method: post
		  
3. Modifying the Lambda Function
   -----------------------------
In handler.js, replace the existing code with the following:

javascript

'use strict';


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





4. Deploying the Application
   -------------------------


Run the following command in the terminal to deploy the application:

serverless deploy:



This command deploys the Lambda function, API Gateway, and any other specified AWS resources using CloudFormation.

5. Verifying the Deployment
   ------------------------

   
After deployment, note the endpoint URL provided by the Serverless Framework. You can now use this endpoint as the webhook URL in GitHub to test the application.

6. Testing the Webhook
   -------------------
To test the webhook:

1. Configure a GitHub repository to send POST requests to the deployed endpoint.

2. Trigger the webhook by making a relevant action in your GitHub repository.

3. Check the logs in the AWS Console (CloudWatch) to confirm the function execution.
Monitoring with Datadog

4. Ensure you’re logged into Datadog.

5. Navigate to the API Keys section and confirm your API key matches the environment.

6. Use Datadog's monitoring and dashboard features to observe metrics from your Lambda functions and API Gateway.

Resources
--------
-Serverless Framework Documentation

-AWS CloudFormation Documentation

-Datadog Serverless Monitoring


