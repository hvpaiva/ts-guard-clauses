import { ArgumentNullException, Guard } from '../src';

describe('Against Null Tests', () => {
  it('should not throw exception when the input is not null', () => {
    Guard.against().null(0);
  });

  it('should return the input value if tests passes', () => {
    const checked = Guard.against().null(0);

    expect(checked).toBe(0);
  });

  it('should throw ArgumentNullException if the input is null', () => {
    const action = () => {
      const toBeChecked = null;
      Guard.against().null(toBeChecked);
    };
    try {
      action();
    } catch (err) {
      expect(err instanceof ArgumentNullException).toBeTruthy();
      expect(err.message).toBe('The value cannot be null');
    }

    expect(() => action()).toThrow(ArgumentNullException);
  });

  it('should allow to create custom exceptions', () => {
    class CustomException extends Error {
      constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
      }
    }
    const action = () => {
      const toBeChecked = null;
      Guard.against().null(
        toBeChecked,
        'O valor não pode ser nulo.',
        CustomException,
      );
    };

    try {
      action();
    } catch (err) {
      expect(err instanceof CustomException).toBeTruthy();
      expect(err.message).toBe('O valor não pode ser nulo.');
    }

    expect(() => action()).toThrow(CustomException);
  });
});
