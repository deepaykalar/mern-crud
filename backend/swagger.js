const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN User API",
      version: "1.0.0",
      description: "A simple CRUD API with Express, MongoDB and Swagger"
    },
    servers: [
      { url: "http://localhost:5100" }
    ],
  },
  apis: ["./index.js"], 
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
