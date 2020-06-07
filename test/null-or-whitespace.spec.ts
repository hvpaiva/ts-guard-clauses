import { ArgumentException, ArgumentNullException, Guard } from '../src';

describe('Against NullOrWhiteSpace', () => {
  it('should not throw exception when the input is not white space', () => {
    Guard.against().nullOrWhiteSpace(0);
  });

  it('should return the input value if tests passes', () => {
    const checked = Guard.against().nullOrWhiteSpace(0);

    expect(checked).toBe(0);
  });

  it('should throw ArgumentNullException if the value is null', () => {
    const action = () => {
      Guard.against().nullOrWhiteSpace(null);
    };
    try {
    } catch (err) {
      expect(err instanceof ArgumentNullException).toBeTruthy();
      expect(err.message).toBe('The value cannot be null');
    }

    expect(() => action()).toThrow(ArgumentNullException);
  });

  it('should throw ArgumentException if the value is empty string', () => {
    const action = () => {
      Guard.against().nullOrWhiteSpace('');
    };
    try {
    } catch (err) {
      expect(err instanceof ArgumentException).toBeTruthy();
      expect(err.message).toBe('The value cannot be empty');
    }

    expect(() => action()).toThrow(ArgumentException);
  });

  it('should throw ArgumentException if the value is empty array', () => {
    const action = () => {
      Guard.against().nullOrWhiteSpace([]);
    };
    try {
    } catch (err) {
      expect(err instanceof ArgumentException).toBeTruthy();
      expect(err.message).toBe('The value cannot be empty');
    }

    expect(() => action()).toThrow(ArgumentException);
  });

  it('should throw ArgumentException if the value is an white space', () => {
    const action = () => {
      Guard.against().nullOrWhiteSpace(' ');
    };
    try {
    } catch (err) {
      expect(err instanceof ArgumentException).toBeTruthy();
      expect(err.message).toBe('The value cannot be empty white space');
    }

    expect(() => action()).toThrow(ArgumentException);
  });

  it('should allow to create custom exceptions', () => {
    class CustomException extends Error {
      constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
      }
    }
    const action = () => {
      const toBeChecked = ' ';
      Guard.against().nullOrWhiteSpace(
        toBeChecked,
        'O valor não pode ser nulo ou vazio.',
        CustomException,
      );
    };

    try {
      action();
    } catch (err) {
      expect(err instanceof CustomException).toBeTruthy();
      expect(err.message).toBe('O valor não pode ser nulo ou vazio.');
    }

    expect(() => action()).toThrow(CustomException);
  });
});
