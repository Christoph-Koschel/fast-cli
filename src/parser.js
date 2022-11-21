"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI = void 0;
const handler_1 = require("./handler");
class CLI {
    args;
    cmds;
    constructor(args) {
        args.shift();
        args.shift();
        this.args = args;
        this.cmds = [];
    }
    register(cmd) {
        this.cmds.push(cmd);
    }
    async exec() {
        const cmdName = this.args[0].startsWith("-") ? null : this.args.shift();
        const argumentHandler = this.buildArguments();
        const isHelp = argumentHandler.hasFlag("--help");
        if (isHelp && cmdName == null && argumentHandler.attrLength() == 0 && argumentHandler.flagLength() == 1) {
            this.printGlobalHelp();
            return 0;
        }
        else if (cmdName == null) {
            this.printCommandNotFound();
            return 1;
        }
        for (let cmd of this.cmds) {
            let command = cmd.getCMD();
            if (command.equals(cmdName, argumentHandler)) {
                if (isHelp) {
                    process.stdout.write(command.toString());
                }
                else {
                    return await cmd.execute(argumentHandler);
                }
            }
        }
        this.printCommandNotFound();
        return 1;
    }
    buildArguments() {
        const attrs = [];
        const flags = [];
        this.args.forEach((value, index) => {
            if (value.startsWith("-") && !this.isFlag(value)) {
                for (let i = index; i < this.args.length; i++) {
                    if (!this.isFlag(value)) {
                        attrs.push(new handler_1.ArgumentAttribute(value, this.args[i + 1]));
                        break;
                    }
                }
            }
            else if (this.isFlag(value)) {
                flags.push(new handler_1.ArgumentFlag(value));
            }
        });
        return new handler_1.ArgumentHandler(flags, attrs);
    }
    isFlag(x) {
        return x.startsWith("--");
    }
    printGlobalHelp() {
    }
    printCommandNotFound() {
    }
}
exports.CLI = CLI;
//# sourceMappingURL=parser.js.map