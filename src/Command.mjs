export default class Command {
    constructor() {
        if (new.target === Command) {
            throw new TypeError("Cannot construct Command instances directly");
        }
    }

    validate() {
        if (this.handle === Command.prototype.handle) {
            throw new TypeError("Must override method handle");
        }

        if (!this.signature) {
            throw new TypeError("Must override property signature");
        }

        if (!this.description) {
            throw new TypeError("Must override property description");
        }
    }

    handle() {
        throw new Error("You have to implement the method handle!");
    }
}
