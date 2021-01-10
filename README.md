# Quotes Serverless Appplication

Implementing quotes serverless application using AWS Lambda and Serverless framework.
This application will allow creating/removing/updating/fetching quotes. Each quotes item can optionally have an attachment image. Each user only has access to quotes items that he/she has created.

## Functionality of the application

- A user needs to authenticate in order to use an application.
- The application allows users to create, update, delete quotes.
- The application allows users to upload a file.
- The application only displays items for a logged in user.

# Quotes items

The application store Quotes, and each item contains the following fields:

* `userId` (string) - user id for an item
* `quoteId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `name` (string) - name of a TODO item (e.g. "Change a light bulb")
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a TODO item


## Authentication

To implement authentication in your application, you would have to create an Auth0 application and copy "domain" and "client id" to the `config.ts` file in the `client` folder. 

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

# Postman collection

An alternative way to test your API, you can use the Postman collection that contains sample requests. You can find a Postman collection in this project.

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