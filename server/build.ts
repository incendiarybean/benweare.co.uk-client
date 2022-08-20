const exec = require("child_process").exec;
const os = require("os");

if (os.type() === "Linux") exec("npm run build-linux");
else if (os.type() === "Windows_NT") exec("npm run build-windows");
