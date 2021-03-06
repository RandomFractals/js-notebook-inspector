import { LogLevel } from "./logger";

// log level setting for publishing vs. dev run of this ext.
export const logLevel: LogLevel = LogLevel.Info; // change to .Debug for dev ...

export const supportedDataFiles: RegExp = /.*\.(js|jsnb)/;

// Observable JS site/api base urls
export const observableSiteUrl: string = 'https://observablehq.com';
export const observableApiUrl: string = 'https://api.observablehq.com';

// basic Observable JS runtime/inspector html template
export const observableHtmlTemplate: string = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Security-Policy" 
      content="default-src 'self' https://*;
        script-src https: 'unsafe-inline' 'unsafe-eval';
        style-src https: 'unsafe-inline';
        img-src 'self' https://* blob: data:;
        font-src 'self' https://* blob: data:;
        connect-src 'self' https://* wss://*;
        worker-src 'self' https://* blob: data:">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="JS Notebook View">
    <title>JS Notebook: {title}</title>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@3/dist/inspector.css">
  </head>
  <body>
    <script type="module">
      // load the Observable runtime and inspector
      import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";

      // import JS notebook ES module
      import notebook from "https://api.observablehq.com/{notebookPath}?v=3";

      // render notebook into document body with the default Observable JS inspector
      new Runtime().module(notebook, Inspector.into(document.body));
    </script>
  </body>
</html>
`;
