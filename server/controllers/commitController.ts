import { Request, Response } from "express";
import * as commitService from "../services/commitService";

export const getCommits = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const commits = await commitService.fetchAllCommits();
    res.status(200).json(commits);
  } catch (error) {
    console.error("Error fetching commits:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export default {
  getCommits,
};
