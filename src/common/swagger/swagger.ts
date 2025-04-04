export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test API",
      version: "1.0.0",
      description: "Template for another project",
      termsOfService: "any",
      contact: {
        name: "API Support",
        url: "any",
        email: "support@example.com",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Node JS Build API",
      },
    ],
  },
  apis: [
    "./dist/src/backend/routers/unhandledRouter.js",
    "./dist/src/backend/routers/adminRouterBase.js",
    "./dist/src/backend/routers/usersRouterBase.js",
    "./dist/src/backend/routers/authRouterBase.js",
  ],
};
