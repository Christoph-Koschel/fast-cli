"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandAttribute = exports.CommandFlag = exports.CommandConstructor = exports.Command = exports.ArgumentAttribute = exports.ArgumentFlag = exports.ArgumentHandler = void 0;
class ArgumentHandler {
    flags;
    attrs;
    constructor(flags, attrs) {
        this.flags = flags;
        this.attrs = attrs;
    }
    hasFlag(name) {
        for (let flag of this.flags) {
            if (flag.name == name) {
                return true;
            }
        }
        return false;
    }
    hasAttr(name) {
        for (let attr of this.attrs) {
            if (attr.name == name) {
                return true;
            }
        }
        return false;
    }
    getAttr(name) {
        for (let attr of this.attrs) {
            if (attr.name == name) {
                return attr.value;
            }
        }
        return null;
    }
    flagLength() {
        return this.flags.length;
    }
    attrLength() {
        return this.attrs.length;
    }
}
exports.ArgumentHandler = ArgumentHandler;
class ArgumentFlag {
    name;
    constructor(name) {
        this.name = name;
    }
}
exports.ArgumentFlag = ArgumentFlag;
class ArgumentAttribute {
    name;
    value;
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
exports.ArgumentAttribute = ArgumentAttribute;
class Command {
}
exports.Command = Command;
class CommandConstructor {
    name;
    flags;
    attrs;
    constructor(name) {
        this.name = name;
        this.flags = [];
        this.attrs = [];
    }
    addFlag(name, optional, description) {
        this.flags.push(new CommandFlag(name, optional, description));
        return this;
    }
    addAttribute(char, name, optional, description) {
        this.attrs.push(new CommandAttribute(char, name, optional, description));
        return this;
    }
    equals(name, argv) {
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
    toString() {
        let str = this.name + " ";
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
        let size = this.calcSize();
        for (let attr of this.attrs) {
            str += attr.char + " ".repeat(size - attr.char.length) + (attr.optional ? "  [OPTIONAL]" : "") + "   " + attr.description + "\n";
        }
        for (let flags of this.flags) {
            str += flags.name + " ".repeat(size - flags.name.length) + (flags.optional ? "  [OPTIONAL]" : "") + "   " + flags.description + "\n";
        }
        return str;
    }
    calcSize() {
        let size = 0;
        this.flags.forEach((x) => {
            if (x.name.length > size) {
                size = x.name.length;
            }
        });
        this.attrs.forEach((x) => {
            if (x.char.length > size) {
                size = x.char.length;
            }
        });
        return size;
    }
}
exports.CommandConstructor = CommandConstructor;
class CommandFlag {
    name;
    optional;
    description;
    constructor(name, optional, description) {
        this.name = name;
        this.optional = optional;
        this.description = description;
    }
}
exports.CommandFlag = CommandFlag;
class CommandAttribute {
    char;
    name;
    optional;
    description;
    constructor(char, name, optional, description) {
        this.char = char;
        this.name = name;
        this.optional = optional;
        this.description = description;
    }
}
exports.CommandAttribute = CommandAttribute;
//# sourceMappingURL=handler.js.map