# API-Weather-Journal-App

## Project Environment Setup

    Node and Express installed on the local machine
    The ‘cors’ package installed in the project from the command line
    The body-parser package  installed and included in the project.

## APIs and Routes

    There's a JavaScript Object named projectData initiated in the file server.js to act as the app API endpoint.
    The personal API Key for OpenWeatherMap API is saved in a named const variable.
    The API Key variable is passed as a parameter to fetch()
    Data is successfully returned from the external API.
    There's a GET route setup on the server side with the first argument as a string naming the route, and the second argument a callback function to return the JS object created at the top of server code.
    You should be able to add an entry to the project endpoint using a POST route setup on the server side and executed on the client side as an asynchronous function.
    The client side function takes two arguments, the URL to make a POST to, and an object holding the data to POST.
    The server side function creates a new entry in the apps endpoint (the named JS object) consisting of the data received from the client side POST.

## Dynamic UI

    The input element with the placeholder property set to “enter zip code here” should have an id of zip.
    The textarea included in project HTML should have an id of feelings.
    The button included in project HTML should have an id of generate
