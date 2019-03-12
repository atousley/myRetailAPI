# myRetailAPI

Target Case Study. Submitted by Annette Tousley.

## Overview

[Case Study Requirements](#case-study-requirements)
[Using This Repository](#using-this-repository)
    [Prerequisits](#prerequisits)
    [Installing Dependencies](#installing-dependencies)
    [Making Test API Calls](#making-test-api-calls)
[Screenshots of PostMan Testing](#screenshots-of-postman-testing)

## Case Study Requirements

### myRetail RESTful Service
```
myRetail is a rapidly growing company with HQ in Richmond, VA and over 200 stores across the east coast. myRetail wants to make its internal data available to any number of client devices, from myRetail.com to native mobile apps.

The goal for this exercise is to create an end-to-end Proof-of-Concept for a products API, which will aggregate product data from multiple sources and return it as JSON to the caller. 
Your goal is to create a RESTful service that can retrieve product and price details by ID. The URL structure is up to you to define, but try to follow some sort of logical convention.

Build an application that performs the following actions:
    - Responds to an HTTP GET request at /products/{id} and delivers product data as JSON (where {id} will be a number. 
    - Example product IDs: 15117729, 16483589, 16696652, 16752456, 15643793) 
    - Example response: {"id":13860428,"name":"The Big Lebowski (Blu-ray) (Widescreen)","current_price":{"value": 13.49,"currency_code":"USD"}}
    - Performs an HTTP GET to retrieve the product name from an external API. (For this exercise the data will come from redsky.target.com, but let’s just pretend this is an internal resource hosted by myRetail)
    - Example: http://redsky.target.com/v2/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics
    - Reads pricing information from a NoSQL data store and combines it with the product id and name from the HTTP request into a single response.
    - BONUS: Accepts an HTTP PUT request at the same path (/products/{id}), containing a JSON request body similar to the GET response, and updates the product’s price in the data store.
```

## Using This Repository

 Ensure the following prerequisits are installed prior to proceeding to installing dependencies or making test API calls.

### Prerequisits

        [NodeJS](https://nodejs.org/en/)
        Node Package Manager [(npm)](https://www.npmjs.com/)
        [MongoDB](https://www.mongodb.com/download-center/community) 
        [PostMan](https://www.getpostman.com/)

### Installing Dependencies
```
/yourPreferredDirectory/: $ git clone https://github.com/atousley/myRetailAPI.git
$ cd myRetailAPI
$ npm install
```

### Starting Local Server
```
$ node index    // `nodemon index` also works
```

### Making Test API Calls

Because this method of testing assumes a local database with pricing data exists, all of your initial GET requests will return with error "There is no product description for this product id."

Outside of the base requirements, this app was built to accept a POST request to provide pricing data.

Follow steps below to POST pricing data to the mongoDB instance and test the full app with GET and PUT requests.

```
Initial POST so that there's data to retreive
1. Open PostMan
2. In the navigation bar in the main screen, select "POST" from the dropdown
3. In the navigation bar enter "http://localhost:8080/api/products/"
4. Select "Body" from the option beneath the navigation bar
5. Select "x-www-form-urlencoded" from the available options
6. In the key/value section enter the following:
    KEY             VALUE
    extID           13860428
    value           13.49
    currency_code   USD
7. Ensure the checkboxes are marked in line with the key value pairs
8. Hit the "Send" button to the right of the navigation bar

GET
1. In PostMan, change the dropdown to the left of the navigation bar to "GET"
2. Change the path in the navigation bar to "http://localhost:8080/api/products/13860428"
3. Hit the "Send" button to the right of the navigation bar

PUT
1. In PostMan, change the dropdown to the left of the navigation bar to "PUT"
2. The path in the navigation bar should remain "http://localhost:8080/api/products/13860428"
3. Select "Body" from the option beneath the navigation bar
4. Select "x-www-form-urlencoded" from the available options
5. In the key/value section enter the following:
    KEY             VALUE
    value           25.49
6. Ensure the only box check is the one for "value"
7. Hit the "Send" button to the right of the navigation bar
```

## Screenshots of PostMan Testing

        [GET](./postmanScreenshots/postman_GET.png)
        [PUT](./postmanScreenshots/postman_PUT.png)
        [POST](./postmanScreenshots/postman_POST.png)
        [GET error](./postmanScreenshots/postman_GET_error.png)
        [PUT error](./postmanScreenshots/postman_PUT_error.png)