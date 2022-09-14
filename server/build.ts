import { exec } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const syncServerDist = (sourcePath: string) => {
    const source = `./server/${sourcePath}`;
    const destination = `./dist/${sourcePath}`;

    const srcExists = fs.existsSync(source);
    if (!srcExists) {
        throw new Error("File source doesn't exist.");
    }

    const isDirectory = fs.statSync(source).isDirectory();
    if (isDirectory) {
        const destExists = fs.existsSync(destination);
        if (!destExists) {
            fs.mkdirSync(destination);
        }

        fs.readdirSync(source).forEach(function (childItemName) {
            syncServerDist(path.join(sourcePath, childItemName));
        });
    } else {
        fs.copyFileSync(source, destination);
    }
};

console.log("Moving client files...");
if (os.type() === "Linux") {
    exec("mv build ./dist/app");
} else if (os.type() === "Windows_NT") {
    exec("move build ./dist/app");
}
syncServerDist("resources/audio");
