import { LogLevel } from "./logger";

// log level setting for publishing vs. dev run of this ext.
export const logLevel: LogLevel = LogLevel.Info; // change to .Debug for dev ...

export const supportedDataFiles: RegExp = /.*\.(js|jsnb)/;
