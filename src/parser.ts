import {ArgumentAttribute, ArgumentFlag, ArgumentHandler, Command, CommandConstructor} from "./handler";

export class CLI {
    private args: string[];
    private cmds: Command[];

    public constructor(args: string[]) {
        args.shift();
        args.shift();
        this.args = args;
        this.cmds = [];
    }

    public register(cmd: Command) {
        this.cmds.push(cmd);
    }

    public async exec(): Promise<number> {
        const cmdName: string | null = this.args[0].startsWith("-") ? null : <string>this.args.shift();
        const argumentHandler: ArgumentHandler = this.buildArguments();

        const isHelp = argumentHandler.hasFlag("--help");

        if (isHelp && cmdName == null && argumentHandler.attrLength() == 0 && argumentHandler.flagLength() == 1) {
            this.printGlobalHelp();
            return 0;
        } else if (cmdName == null) {
            this.printCommandNotFound();
            return 1;
        }

        if (isHelp) {
            let cmds: Command[] = [];

            for (let cmd of this.cmds) {
                let command: CommandConstructor = cmd.getCMD();
                if (command.getName() == cmdName) {
                    cmds.push(cmd);
                }
            }

            console.log("Found " + cmds.length + " commands\n");
            cmds.forEach(cmd => {
                console.log(cmd.getCMD().toString(cmd));
                console.log("\n");
            });
        } else {
            for (let cmd of this.cmds) {
                let command: CommandConstructor = cmd.getCMD();
                if (command.equals(cmdName, argumentHandler)) {
                    return await cmd.execute(argumentHandler);
                }
            }
        }

        this.printCommandNotFound();
        return 1;
    }

    private buildArguments(): ArgumentHandler {
        const attrs: ArgumentAttribute[] = [];
        const flags: ArgumentFlag[] = [];

        this.args.forEach((value, index) => {
            if (value.startsWith("-") && !this.isFlag(value)) {
                for (let i = index; i < this.args.length; i++) {
                    if (!this.isFlag(value)) {
                        attrs.push(new ArgumentAttribute(value, this.args[i + 1]));
                        break;
                    }
                }
            } else if (this.isFlag(value)) {
                flags.push(new ArgumentFlag(value));
            }
        });

        return new ArgumentHandler(flags, attrs);
    }

    private isFlag(x: string): boolean {
        return x.startsWith("--");
    }

    private printGlobalHelp() {
        let group: { name: string, overflow: number }[] = [];
        for (let cmd of this.cmds) {
            let edit: boolean = false;

            for (let groupElement of group) {
                if (groupElement.name == cmd.getCMD().getName()) {
                    groupElement.overflow++;
                    edit = true;
                }
            }

            if (!edit) {
                group.push({
                    name: cmd.getCMD().getName(),
                    overflow: 0
                });
            }
        }


        group = group.sort((a, b) => a.name < b.name ? -1 : 1);
        for (let groupElement of group) {
            process.stdout.write(`${groupElement.name} `);
        }
    }

    private printCommandNotFound() {
        // TODO print command not found;
    }
}