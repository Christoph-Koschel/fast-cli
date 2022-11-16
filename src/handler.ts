export class ArgumentHandler {
    private flags: ArgumentFlag[];
    private attrs: ArgumentAttribute[];

    public constructor(flags: ArgumentFlag[], attrs: ArgumentAttribute[]) {
        this.flags = flags;
        this.attrs = attrs;
    }

    public hasFlag(name: string): boolean {
        for (let flag of this.flags) {
            if (flag.name == name) {
                return true;
            }
        }

        return false;
    }

    public hasAttr(name: string) {
        for (let attr of this.attrs) {
            if (attr.name == name) {
                return true;
            }
        }

        return false;
    }

    public getAttr(name: string): string | null {
        for (let attr of this.attrs) {
            if (attr.name == name) {
                return attr.value;
            }
        }

        return null;
    }

    public flagLength() {
        return this.flags.length;
    }

    public attrLength() {
        return this.attrs.length;
    }
}


export class ArgumentFlag {
    public readonly name: string;

    public constructor(name: string) {
        this.name = name;
    }
}

export class ArgumentAttribute {
    public readonly name: string;
    public readonly value: string;

    public constructor(name: string, value: string) {
        this.name = name;
        this.value = value;

    }
}

export abstract class Command {
    public abstract execute(argv: ArgumentHandler): Promise<number>;

    public abstract getCMD(): CommandConstructor;

    public abstract getDescription(): string;
}

export class CommandConstructor {
    private name: string;
    private flags: CommandFlag[];
    private attrs: CommandAttribute[];

    public constructor(name: string) {
        this.name = name;
        this.flags = [];
        this.attrs = [];
    }

    public addFlag(name: string, optional: boolean, description: string): CommandConstructor {
        this.flags.push(new CommandFlag(name, optional, description));
        return this;
    }

    public addAttribute(char: string, name: string, optional: boolean, description: string): CommandConstructor {
        this.attrs.push(new CommandAttribute(char, name, optional, description));
        return this;
    }

    public equals(name: string, argv: ArgumentHandler): boolean {
        if (name != this.name) {
            return false;
        }

        for (let attr of this.attrs) {
            if (attr.optional) {
                continue;
            }

            if (!argv.hasAttr(attr.char)) {
                return false;
            }
        }

        for (let flag of this.flags) {
            if (flag.optional) {
                continue;
            }

            if (!argv.hasFlag(flag.name)) {
                return false;
            }
        }

        return true;
    }

    public toString(): string {
        let str: string = this.name + " ";

        for (let attr of this.attrs) {
            if (!attr.optional) {
                str += attr.char + " <" + attr.name + "> ";
            }
        }

        for (let attr of this.attrs) {
            if (attr.optional) {
                str += "[" + attr.char + " <" + attr.name + ">] ";
            }
        }

        for (let flag of this.flags) {
            if (!flag.optional) {
                str += flag.name + " ";
            }
        }

        for (let flag of this.flags) {
            if (flag.optional) {
                str += "[" + flag.name + "] ";
            }
        }

        str += "\n\n";
        for (let attr of this.attrs) {
            str += attr.char + (attr.optional ? "  [OPTIONAL]" : "") + "   " + attr.description + "\n";
        }

        for (let flags of this.flags) {
            str += flags.name + (flags.optional ? "  [OPTIONAL]" : "") + "   " + flags.description + "\n";
        }

        return str;
    }
}

export class CommandFlag {
    public readonly name: string;
    public readonly optional: boolean;
    public readonly description: string;

    public constructor(name: string, optional: boolean, description: string) {
        this.name = name;
        this.optional = optional;
        this.description = description;
    }
}

export class CommandAttribute {
    public readonly char: string;
    public readonly name: string;
    public readonly optional: boolean;
    public readonly description: string;

    public constructor(char: string, name: string, optional: boolean, description: string) {
        this.char = char;
        this.name = name;
        this.optional = optional;
        this.description = description;

    }
}