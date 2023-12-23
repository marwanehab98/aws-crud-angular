# AWS Crud POC

This project is a POC for making a serveless application using:
* AWS Cognito for authentication.
* AWS Lambda for running DynamoDB CRUD operations.
* AWS API Gateway for API Calls to the Lambda functions.

A live version of the project is hosted on [aws-crud-angular](https://aws-crud-angular.vercel.app/)



## AWS Cognito

* AWS Cognito is used for authentication.
* The user registers or logs in using email and password.
* When the user first registers they receive an email containing a verification code that they need to enter to confirm their registration.
* As this is a serverless application/purely a client app where it's not safe to store a client secret the OAuth Implicit Grant is used.
* When the user tries to authenticate he is redirected to a page with the access token in the URL.
* The token is extracted and saved to be used for API Calls.
* Then the user is immediately redirected to the home page of the application.

## AWS API Gateway

* AWS API Gateway is used to create multiple API routes for calling the Lambda functions.
* There are APIs for GET, PUT, and DELETE requests.
* The GET request is responsible for invoking a Lambda function that returns all items in the database.
* The PUT request is responsible for invoking a Lambda function that creates a new item if the provided id does not exist in the databse, or updating an already existing item otherwise.
* The DELETE request is responsible for invoking a Lambda function that deletes an item from the database.

## AWS Lambda

* AWS Lambda is used to run CRUD operations on a DynamoDB instance.
* The source code for the Lambda functions is available in the `lambda_functions` directory.

## Run

To run this project locally, clone the Github repository, open the directory in the terminal, run `npm i` to install npm dependencies, then run `npm start` to run the project on http://localhost:4200.

Alternatively you can view a hosted version of the project on [aws-crud-angular](https://aws-crud-angular.vercel.app/)

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
