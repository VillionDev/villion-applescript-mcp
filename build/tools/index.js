"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApplicationSchema = exports.openApplication = void 0;
const zod_1 = require("zod");
const openApplicationSchema = {
    app: zod_1.z.string().describe("Name of the application to open"),
};
exports.openApplicationSchema = openApplicationSchema;
const openApplication = async (args) => {
    const { exec } = require("child_process");
    const { app } = args;
    return new Promise((resolve) => {
        exec(`open -a "${app}"`, (error) => {
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
            }
            else {
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
exports.openApplication = openApplication;
