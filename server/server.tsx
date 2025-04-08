import express from "express";
import { renderToString } from "react-dom/server";
import React from "react";
import App from "../client/App";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Welcome</title>
      </head>
      <body>
        <h1>Welcome to the SSR Web App</h1>
        <p>Navigate to <code>http://localhost:${PORT}/&lt;hash&gt;</code> where &lt;hash&gt; is the unique identifier for the design.</p>
      </body>
    </html>
  `);
});

app.get("/:hash", async (req, res) => {
  const { hash } = req.params;

  try {
    const response = await fetch(`${process.env.API_URL}/designs/${hash}/json`);
    const jsonData = (await response.json()) as any;

    const content = renderToString(<App data={jsonData.banner} />);

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>SSR Web App</title>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
            }
            #root {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
          <div id="root">${content}</div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    res.status(500).send("Error fetching or rendering data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
