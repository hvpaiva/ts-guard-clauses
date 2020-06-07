export class BaseException {
  constructor () {
    Error.apply(this, arguments);
  }
}
