export enum Colors {
    RED = "\x1b[31m",
    GREEN = "\x1b[32m",
    YELLOW = "\x1b[33m",
    BLUE = "\x1b[34m",
    MAGENTA = "\x1b[35m",
    CYAN = "\x1b[36m",
    GRAY = "\x1b[37m",
}

const RESET = "\x1b[30m";
let INFO: Colors = Colors.CYAN;
let ERROR: Colors = Colors.RED;
let LOG: Colors = Colors.GRAY;
let PREFIX_SPACE: number = 8;

export function set_colors(info: Colors, error: Colors, log: Colors) {
    INFO = info;
    ERROR = error;
    LOG = log;
}

export function get_colors(): { info: Colors, error: Colors, log: Colors } {
    return {
        info: INFO,
        error: ERROR,
        log: LOG
    };
}

export function writeln_info(message: string, ignorePrefix: boolean = false) {
    write_info(message + "\n", ignorePrefix);
}

export function write_info(message: string, ignorePrefix: boolean = false) {
    write(INFO, ignorePrefix ? "" : "INFO:", message);
}

export function writeln_error(message: string, ignorePrefix: boolean = false) {
    write_error(message + "\n", ignorePrefix);
}

export function write_error(message: string, ignorePrefix: boolean = false) {
    write(ERROR, ignorePrefix ? "" : "ERROR:", message);
}

export function writeln_log(message: string, ignorePrefix: boolean = false) {
    write_log(message + "\n", ignorePrefix);
}

export function write_log(message: string, ignorePrefix: boolean = false) {
    write(LOG, ignorePrefix ? "" : "LOG:", message);
}

function write(code: Colors, prefix: string, message: string) {
    process.stdout.write(code);
    process.stdout.write(prefix + (" ".repeat(PREFIX_SPACE - prefix.length)));
    process.stdout.write(message);
    process.stdout.write(RESET);
}