import { Command } from "./handler";
export declare class CLI {
    private args;
    private cmds;
    constructor(args: string[]);
    register(cmd: Command): void;
    exec(): number;
    private buildArguments;
    private isFlag;
    private printGlobalHelp;
    private printCommandNotFound;
}
//# sourceMappingURL=parser.d.ts.map