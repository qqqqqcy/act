const express = require("express");
const app = express();
const port = 80;
const { spawn } = require("child_process");

app.use(
  express.static(__dirname, {
    extensions: ["js", "html"]
  })
);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);

  //   启动 tsc
  setTimeout(() => {
    spawn("yarn", ["tsc", "-w"], { stdio: "inherit" });
  }, 1000);
});
