import { ArgumentException } from '../src/Exceptions/ArgumentException';
import { ArgumentNullException } from '../src/Exceptions/ArgumentNullException';
import { Guard } from '../src/Guard';

describe('Guard Tests', () => {
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

    it('should allow to create custom exceptions in Null', () => {
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
  describe('Against NullOrEmpty Tests', () => {
    it('should not throw exception when the input is not null or empty', () => {
      Guard.against().nullOrEmpty(0);
    });

    it('should return the input value if tests passes', () => {
      const checked = Guard.against().nullOrEmpty(0);

      expect(checked).toBe(0);
    });

    it('should throw ArgumentNullException if the value is null', () => {
      const action = () => {
        Guard.against().nullOrEmpty(null);
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
        Guard.against().nullOrEmpty('');
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
        Guard.against().nullOrEmpty([]);
      };
      try {
      } catch (err) {
        expect(err instanceof ArgumentException).toBeTruthy();
        expect(err.message).toBe('The value cannot be empty');
      }

      expect(() => action()).toThrow(ArgumentException);
    });

    it('should allow to create custom exceptions in NullOrEmpty', () => {
      class CustomException extends Error {
        constructor(message: string) {
          super(message);
          Object.setPrototypeOf(this, new.target.prototype);
        }
      }
      const action = () => {
        const toBeChecked = null;
        Guard.against().nullOrEmpty(
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
});
