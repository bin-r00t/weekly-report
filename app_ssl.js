import compression from "compression";
import express from "express";
import morgan from "morgan";
import https from "https";
import fs from "fs";

// Short-circuit the type-checking of the built output.
const BUILD_PATH = "./build/server/index.js";
const PRIVATE_KEY_PATH = "./certs/key.pem";
const CERTIFICATE_PATH = "./certs/cert.pem";

const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = Number.parseInt(process.env.PORT || "443");

const app = express();

app.use(compression());
app.disable("x-powered-by");

if (DEVELOPMENT) {
  console.log("Starting development server");
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    }),
  );
  app.use(viteDevServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule("./server/app.ts");
      return await source.app(req, res, next);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
} else {
  console.log("Starting production server");
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" }),
  );
  app.use(morgan("tiny"));
  app.use(express.static("build/client", { maxAge: "1h" }));
  app.use(await import(BUILD_PATH).then((mod) => mod.app));
}

const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
const certificate = fs.readFileSync(CERTIFICATE_PATH, "utf8");

const credentials = {
  key: privateKey,
  cert: certificate,
};

https.createServer(credentials, app).listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
