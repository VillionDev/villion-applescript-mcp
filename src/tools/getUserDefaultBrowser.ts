import { exec } from "child_process";
import { z } from "zod";
import { PromiseToolType } from "../types/tools-types";
export * from "./openApplication";

// const bundleToDisplay: Record<string, string> = {
//   "com.google.chrome": "Google Chrome",
//   "com.apple.safari": "Safari",
//   "org.mozilla.firefox": "Firefox",
// };

const getUserBrowserSchema = z.object({});

const getUserBrowser = async () => {
  const cmd = `
    defaults read ~/Library/Preferences/com.apple.LaunchServices/com.apple.launchservices.secure LSHandlers | \
    plutil -convert json -o - -- - | \
    jq -r '.[] | select(.LSHandlerURLScheme == "http") | .LSHandlerRoleAll'
    `;

  return new Promise<PromiseToolType>((resolve) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        resolve({ content: [{ type: "text", text: stderr }], isError: true });
      } else {
        const bundleId = stdout.trim(); // <—— newline gone
        resolve({
          content: [{ type: "text", text: bundleId }],
          // better:      ↑ just the raw id, no prose
        });
      }
    });
  });
};

export { getUserBrowser, getUserBrowserSchema };
