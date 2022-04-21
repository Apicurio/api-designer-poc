# api-designer-poc
A React application used as the upstream driver for Phase 1 of our API 
Designer project.  This UI provides a kind of mimic for the console.redhat.com
interface, allowing local development and testing in a way that approximates
the look/experience that will be available there.

# Build and run (local)
To run the app locally, do the following:

```bash
$ npm install
$ npm run start:dev
```

Then open your browser (if it doesn't automatically open) to:

http://localhost:8080/

Note that for the UI to work, you will also need to be running the "ads-ui"
UI, which provides a set of federate module components that this project uses.
The UI will fail to load if those are not available.  To run "ads-ui" go 
here:

https://github.com/bf2fc6cc711aee1a0c2a/ads-ui

The `ads-ui` UI should be available on port 9009 (which is the default port
configured for that project).

# Build and run (docker)
To run a production build using docker:

```bash
$ npm install
$ npm run prebuild
$ npm run build
$ docker build -t="apicurio/api-designer-poc" --rm .
$ docker run -it -p 8080:80 apicurio/api-designer-poc
```

Then open your browser to:

http://localhost:8080/

