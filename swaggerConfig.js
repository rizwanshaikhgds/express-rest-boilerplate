import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "T Backend API",
      version: "1.0.0",
      description: "Backend Service for T hosted with Express",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };