import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    info: {
      title: "TODO WebApp Docs",
      description: "Documentacion oficial de E-commerce",
      version: "V 1.0",
    },
  },
  apis: [`${__dirname}/../docs/**/*.yaml`],
};

export const specs = swaggerJSDoc(swaggerOptions);
