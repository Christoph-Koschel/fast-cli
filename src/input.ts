import * as os from "os";

let prefix: string = "";

export function setPrefix(x: string) {
    prefix = x;
}

export async function readline(): Promise<string> {
    return new Promise<string>((resolve) => {
        process.stdout.write(prefix);
        process.stdin.once("data", (x: Buffer) => {
            let str = x.toString("ascii");
            resolve(str.substring(0, str.length - os.EOL.length));
        });
    });
}

export async function decision(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
        while (true) {
            const str: string = await readline();
            if (str.toLowerCase() == "y" || str.toLowerCase() == "yes") {
                resolve(true);
                break;
            } else if (str.toLowerCase() == "n" || str.toLowerCase() == "no") {
                resolve(false);
                break;
            }
        }
    });
}