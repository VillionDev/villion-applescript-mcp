import { exec } from "child_process";
import { z } from "zod";
import { PromiseToolType } from "../types/tools-types";
export * from "./openApplication";

const openApplicationSchema = {
  app: z.string().describe("Name of the application to open"),
};

const openApplication = async (args: { app: string }) => {
  const { app } = args;
  return new Promise<PromiseToolType>((resolve) => {
    exec(`open -a "${app}"`, (error, stdout) => {
      stdout.trim();
      if (error) {
        resolve({
          content: [
            {
              type: "text",
              text: `Failed to open ${app}: ${error.message}`,
            },
          ],
          isError: true,
        });
      } else {
        resolve({
          content: [
            {
              type: "text",
              text: `Successfully opened ${app}`,
            },
          ],
        });
      }
    });
  });
};

export { openApplication, openApplicationSchema };
