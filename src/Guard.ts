import { ArgumentException } from './Exceptions/ArgumentException';
import { ArgumentNullException } from './Exceptions/ArgumentNullException';
import { Class } from './utils';

export class Guard {
  private static _against: Guard;

  private constructor() {}

  static against(): Guard {
    if (!Guard._against) return new Guard();

    return Guard._against;
  }

  public null(
    input: any,
    customMessage?: string,
    exception?: Class<Error>,
  ): any {
    const message = `The value cannot be null`;
    if (input == null)
      if (exception) throw new exception(customMessage ?? message);
      else throw new ArgumentNullException(customMessage ?? message);

    return input;
  }

  public nullOrEmpty(
    input: any,
    customMessage?: string,
    exception?: Class<Error>,
  ): any {
    const message = `The value cannot be empty`;
    Guard.against().null(input, customMessage, exception);
    if (input === '' || input.length === 0)
      if (exception) throw new exception(customMessage ?? message);
      else throw new ArgumentException(customMessage ?? message);

    return input;
  }
}
