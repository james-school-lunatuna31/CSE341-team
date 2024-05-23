const swagger = require('swagger-autogen');

const doc = {
    info: {
        title: "Library API (Group)",
        description: "An application program interface to manage data between the front end and back end of the library application. This application was built for CSE341 by Austin Campbell and James Green.",
    },
    host: "localhost:3000",
    schemes: ["http"]
};

const output = './swagger.json';
const endpoints = ['./routes/index.js'];

//Calls the function with the output file, then runs the backend server.
swagger(output, endpoints, doc).then(async () => {
    await import('./index.js');
});