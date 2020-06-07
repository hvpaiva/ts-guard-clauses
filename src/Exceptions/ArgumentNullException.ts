export class ArgumentNullException extends Error {
  constructor(message?: string) {
    super(message);
    // restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
