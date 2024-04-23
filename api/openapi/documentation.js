"use strict";

const { readFileSync } = require("fs");
const { join } = require("path");

const applicationName = "Star Wars Characters API";

exports.handler = async (event) => {
  if (event.path === "/swagger.json") {
    const swaggerJsonPath = join(__dirname, "openapi.json");
    const swaggerJson = readFileSync(swaggerJsonPath, "utf8");
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: swaggerJson,
    };
  }

  const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${applicationName}</title>
            <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
        </head>
        <body>
            <div id="swagger"></div>
            <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
            <script>
              SwaggerUIBundle({
                dom_id: '#swagger',
                url: '/dev/swagger.json'
            });
            </script>
        </body>
        </html>`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: html,
  };
};
