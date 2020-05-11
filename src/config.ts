import { LogLevel } from "./logger";

// log level setting for publishing vs. dev run of this ext.
export const logLevel: LogLevel = LogLevel.Info; // change to .Debug for dev ...

export const supportedDataFiles: RegExp = /.*\.(js|jsnb)/;

// Observable JS site/api base urls
export const observableSiteUrl: string = 'https://observablehq.com';
export const observableApiUrl: string = 'https://api.observablehq.com';
