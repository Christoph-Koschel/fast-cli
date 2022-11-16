"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decision = exports.readline = exports.setPrefix = void 0;
const os = require("os");
let prefix = "";
function setPrefix(x) {
    prefix = x;
}
exports.setPrefix = setPrefix;
async function readline() {
    return new Promise((resolve) => {
        process.stdout.write(prefix);
        process.stdin.once("data", (x) => {
            let str = x.toString("ascii");
            resolve(str.substring(0, str.length - os.EOL.length));
        });
    });
}
exports.readline = readline;
async function decision() {
    return new Promise(async (resolve) => {
        while (true) {
            const str = await readline();
            if (str.toLowerCase() == "y" || str.toLowerCase() == "yes") {
                resolve(true);
                break;
            }
            else if (str.toLowerCase() == "n" || str.toLowerCase() == "no") {
                resolve(false);
                break;
            }
        }
    });
}
exports.decision = decision;
//# sourceMappingURL=input.js.map