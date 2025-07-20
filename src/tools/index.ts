import { z } from "zod";

const openApplicationSchema = {
  app: z.string().describe("Name of the application to open"),
};

const openApplication = async (args: { app: string }) => {
  const { exec } = require("child_process");
  const { app } = args;
  return new Promise<{
    content: { type: "text"; text: string }[];
    isError?: boolean;
  }>((resolve) => {
    exec(`open -a "${app}"`, (error: any) => {
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
