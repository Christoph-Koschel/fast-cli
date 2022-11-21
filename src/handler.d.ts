export declare class ArgumentHandler {
    private flags;
    private attrs;
    constructor(flags: ArgumentFlag[], attrs: ArgumentAttribute[]);
    hasFlag(name: string): boolean;
    hasAttr(name: string): boolean;
    getAttr(name: string): string | null;
    flagLength(): number;
    attrLength(): number;
}
export declare class ArgumentFlag {
    readonly name: string;
    constructor(name: string);
}
export declare class ArgumentAttribute {
    readonly name: string;
    readonly value: string;
    constructor(name: string, value: string);
}
export declare abstract class Command {
    abstract execute(argv: ArgumentHandler): Promise<number>;
    abstract getCMD(): CommandConstructor;
    abstract getDescription(): string;
}
export declare class CommandConstructor {
    private name;
    private flags;
    private attrs;
    constructor(name: string);
    addFlag(name: string, optional: boolean, description: string): CommandConstructor;
    addAttribute(char: string, name: string, optional: boolean, description: string): CommandConstructor;
    equals(name: string, argv: ArgumentHandler): boolean;
    toString(): string;
    private calcSize;
}
export declare class CommandFlag {
    readonly name: string;
    readonly optional: boolean;
    readonly description: string;
    constructor(name: string, optional: boolean, description: string);
}
export declare class CommandAttribute {
    readonly char: string;
    readonly name: string;
    readonly optional: boolean;
    readonly description: string;
    constructor(char: string, name: string, optional: boolean, description: string);
}
//# sourceMappingURL=handler.d.ts.map