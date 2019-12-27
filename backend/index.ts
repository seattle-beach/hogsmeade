import childProcess from "child_process";
import path from "path";
import process from "process";

import bodyParser from "body-parser";
import express from "express";

const frontendPath = process.env.FRONTEND_PATH!;
const port = process.env.PORT!;

const app = express();

app.use(express.static(frontendPath));

app.get("/", (_req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.post("/", bodyParser.text(), (req, res) => {
  const dot = childProcess.spawn("dot", ["-Tpng"]);

  dot.stdin.write(req.body);
  dot.stdin.end();

  dot.stdout.pipe(res);
});

app.listen(port);
