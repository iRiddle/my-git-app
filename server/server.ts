import http from "http";
import WebSocket from "ws";
import express from "express";
import { getCommits } from "./controllers/commitController";
import { checkForNewCommit } from "./utils/checkForNewCommit";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.get("/api/commits", getCommits);

server.listen(3001, () => {
  console.log("Server started on port 3001");
});

setInterval(checkForNewCommit(wss), 120000);
