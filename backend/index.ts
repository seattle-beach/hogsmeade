import path from "path";
import process from "process";

import express from "express";

const frontendPath = process.env.FRONTEND_PATH!;
const port = process.env.PORT || 3001;

const app = express();

app.use(express.static(frontendPath));

app.get("/", function(_req, res) {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(port);
