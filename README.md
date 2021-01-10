# Quotes Serverless Appplication

Implementing quotes serverless application using AWS Lambda and Serverless framework. 

# Functionality of the application

This application will allow creating/removing/updating/fetching quotes items. Each quotes item can optionally have an attachment image. Each user only has access to quotes items that he/she has created.

# Quotes items

The application should store Quotes items, and each item contains the following fields:

* `quoteId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `name` (string) - name of a TODO item (e.g. "Change a light bulb")
* `description` (string) - description of a quote
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a TODO item

# Functions to be implemented

To implement this project, you need to implement the following functions and configure them in the `serverless.yml` file:

* `Auth` - this function should implement a custom authorizer for API Gateway that should be added to all other functions.

* `GetQuotes` - should return all TODOs for a current user. A user id can be extracted from a JWT token that is sent by the frontend

It should return data that looks like this:

```json
{
  "items": [
    {
      "userId": "randomuser@xuz"
      "quoteId": "123",
      "createdAt": "2019-07-27T20:01:45.424Z",
      "name": "New Day",
      "description": "",
      "attachmentUrl": "http://example.com/image.png"
    }
  ]
}
```

* `CreateQuotes` - should create a new quote for a current user. A shape of data send by a client application to this function can be found in the `CreateQuotesRequest.ts` file

It receives a new quotes item to be created in JSON format that looks like this:

```json
{
  "name": "Buy milk",
  "description": ""
}
```

It should return a new quotes item that looks like this:

```json
{
  "item": {
    "userId": "",
    "quoteId": "123",
    "createdAt": "2019-07-27T20:01:45.424Z",
    "name": "Buy milk",
    "description": "",
    "attachmentUrl": "http://example.com/image.png"
  }
}
```

* `UpdateQuotes` - should update a quotes item created by a current user. A shape of data send by a client application to this function can be found in the `UpdateTodoRequest.ts` file

It receives an object that contains three fields that can be updated in a quotes item:

```json
{
  "name": "Buy bread",
  "description": ""
}
```

The id of an item that should be updated is passed as a URL parameter.

It should return an empty body.

* `DeleteQuotes` - should delete a quotes item created by a current user. Expects an id of a quotes item to remove.

It should return an empty body.

* `GenerateUploadUrl` - returns a pre-signed URL that can be used to upload an attachment file for a quotes item.

It should return a JSON object that looks like this:

```json
{
  "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
```

All functions are already connected to appropriate events from API Gateway.

An id of a user can be extracted from a JWT token passed by a client.

You also need to add any necessary resources to the `resources` section of the `serverless.yml` file such as DynamoDB table and S3 bucket.


## Authentication

To implement authentication in your application, you would have to create an Auth0 application and copy "domain" and "client id" to the `config.ts` file in the `client` folder. We recommend using asymmetrically encrypted JWT tokens.

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

# Postman collection

An alternative way to test your API, you can use the Postman collection that contains sample requests. You can find a Postman collection in this project. To import this collection, do the following.

Click on the import button:

![Alt text](images/import-collection-1.png?raw=true "Image 1")


Click on the "Choose Files":

![Alt text](images/import-collection-2.png?raw=true "Image 2")


Select a file to import:

![Alt text](images/import-collection-3.png?raw=true "Image 3")


Right click on the imported collection to set variables for the collection:

![Alt text](images/import-collection-4.png?raw=true "Image 4")

Provide variables for the collection (similarly to how this was done in the course):

![Alt text](images/import-collection-5.png?raw=true "Image 5")
