# amplify-rest-app-boilerplate-mobile

This template repository holds a front-end and a back-end project that can live together or fully seperated when implemented in a project setting.

# Table of Contents

- Back-end (/api)
  1.  [Documentation](#/api)
  2.  [Setup](#api-setup)
- Front-end (/app-ui)
  1.  [Documentation](#/app-ui)
  2.  [Setup](#ui-setup)
- Production setup
  1. [Deployment](#production-deployment)
  2. [Configuration](#production-configuration)

# `/api`

This sample application stands up a full Serverless Framework REST API Application.

## API Documentation

### Technologies

- [Serverless Framework](https://www.serverless.com/)
- [AWS Cognito](https://aws.amazon.com/cognito/)
- [AWS API Gateway](https://aws.amazon.com/api-gateway/)
- [AWS Lambda](https://aws.amazon.com/lambda/)

### Authorization

Authorization is setup using AWS Cognito. This sample application has support for Username/Password and Oauth sign in via Google. This authorization is afforded to the API Gateway as an Authorizer; requiring a user to sign in before they can interact with the API Gateway endpoints.

### Endpoints

This application uses has a single `/health` endpoint (created via Lambda) which returns a static value of `true` when it is pinged from the client. Authorization is required for this endpoint.

## API Setup

Make sure you have the Serverless CLI [installed](https://www.serverless.com/framework/docs/getting-started/) and are logged in.

Setup Google Sign-in Auth Provider

1. Ask Tyler for access to the Google PoC Project
2. Go to the [Google developer console](https://console.developers.google.com/).
3. Make sure you have selected `poc-project` from the dropdown in the top left, under the acsbdevcore.com domain.
4. Once you have a project selected, choose Credentials on the left navigation bar.
5. Create a new set of OAuth2.0 credentials by choosing OAuth client ID from the Create credentials drop-down list.
6. Choose Web application.
7. Give it a unique name.
8. Click Create.
9. Note the OAuth client ID and client secret.
10. Choose OK.

Replace the Google Client ID and Client Secret Credentials in the `serverless.yml`, leaving the single-quotes.

```
UserPoolIdentityProvider:
        ...
        ProviderName: 'Google'
        ProviderDetails:
          client_id: '<your_client_id>'
          client_secret: '<your_client_secret'
        ...
```

Create an [AWS Profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) named `personal` using programmatic IAM credentials from your personal AWS account.

```
[personal]
aws_access_key_id=XXXXXXXXXXXXXXXXXX
aws_secret_access_key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Update the `UNIQUE_IDENTIFIER` environment variable in `serverless.yml` so that we are creating unique AWS resources where needed. It can be anything you wish, such as `<your_name>-<your_favorite_mythical_animal>`.

```
provider:
  ...
  environment:
    UNIQUE_IDENTIFIER: tcreler-unicorn
```

Deploy the application from your preffered terminal.

```
npm run deploy
```

If successful you should see output similar to this in your terminal.

```
Service Information
service: http-api-node
stage: dev
region: us-east-1
stack: http-api-node-dev
resources: 22
api keys:
  None
endpoints:
  GET - https://t4jvj6sgxe.execute-api.us-east-1.amazonaws.com/health
functions:
  get-health: rest-app-poc-get-health-dev
layers:
  None
```

# `/app-ui`

Contains a React Native application with simple Login, Sign Up, and Dashboard.

## Technologies

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)
- [Amplify SDK](https://docs.amplify.aws/lib/q/platform/js) (We are not using the CLI)

## UI Setup

We need to fill out the cognito information in the `/app-ui/.env` file.

1. Navigate to your cognito user pool in AWS. Note the `Pool Id` and fill in `COGNITO_USER_POOL_ID`
2. Click on App Clients in the left nav note the `App client id` and fill in `COGNITO_USER_POOL_WEB_CLIENT`
3. Click on Domain Name in the left nav and note the full domain (without the https) and fill in `COGNITO_DOMAIN`
4. Navigate back to Cognito -> Identity Pools.
5. Click your identity pool and then click Sample Code in the left nav
6. Note the red Identity pool ID and fill in `COGNITO_IDENTITY_POOL_ID`
7. Navigate to API Gateway, note your API name and fill in `API_NAME`
8. Click on your API, note the Invoke URL and fill in `API_ENDPOINT`

Note: These will never change between deployments. However, they will change if you `npm run remove` and re-deploy the resouces.

Lastly we need to update the Google Authentication with your API URL

1. Go to the [Google developer console](https://console.developers.google.com/).
2. Click the Oauth 2.0 Web App you created previously
3. Under `Authorized Javascript origins` -> `URIs` enter your `COGNITO_DOMAIN` with the `https://` appended.
   1. Ex. `https://service-user-pool-domain-dev-tcreller-unicorn.auth.us-east-1.amazoncognito.com`
4. Under `Authorized redirect URIs` -> `URIs` enter your `COGNITO_DOMAIN` with the `https://` appended AND `/oauth2/idpresponse` added to the end.
   1. Ex. `https://service-user-pool-domain-dev-tcreller-unicorn.auth.us-east-1.amazoncognito.com/oauth2/idpresponse`
5. Click save.

Install dependencies

```
yarn install
```

Run the app

```
expo start
```

# Production Setup

## Production Deployment

Coming soon...

## Production Configuration

Coming soon...

COGNITO setup serverless parameters and custom domain setup for cognito redirect
