import WebSocket from "ws";
import { fetchLatestCommit } from "../services/commitService";
import { Commit } from "../models/commitModel";

let latestCommitSha: string | null = null;

export const checkForNewCommit = (wss: WebSocket.Server) => async () => {
  try {
    const latestCommit: Commit = await fetchLatestCommit();

    if (latestCommit.sha !== latestCommitSha) {
      latestCommitSha = latestCommit.sha;
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(latestCommit));
        }
      });
    }
  } catch (error) {
    console.error("Error fetching latest commit:", error);
  }
};
