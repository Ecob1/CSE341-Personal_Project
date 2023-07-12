const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts",
    description: "Get an update contacts",
  },
  // host: "edgar-y7p9.onrender.com",
  // schemes: ["https"],
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];
 
// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
