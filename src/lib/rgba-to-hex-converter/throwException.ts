import { isInRange } from './isInRange';
interface ExceptionHelper {
  readonly name: string;
  readonly isValid: boolean;
  readonly value: number;
  readonly isAlpha: boolean;
}
export const throwException = (
  red: number,
  green: number,
  blue: number,
  alpha: number
) => {
  const getExceptionHelper = (
    name: string,
    value: number,
    isAlpha: boolean = false
  ): ExceptionHelper => ({
    name,
    isValid: isInRange(isAlpha ? value * 255 : value),
    value,
    isAlpha
  });
  const exceptionHelpers: ReadonlyArray<any> = [
    getExceptionHelper('red', red),
    getExceptionHelper('green', green),
    getExceptionHelper('blue', blue),
    getExceptionHelper('alpha', alpha, true)
  ];
  const variableErrorMessage = ({ isAlpha, name, value }: ExceptionHelper) => {
    const indentation = '    ';
    const range = isAlpha ? '0 and 1' : '0 and 255';
    return `${indentation}Value '${value}' is invalid for '${name}'. Value must be a number between ${range}.`;
  };
  const errorMessage =
    'One or more values supplied for RGBA is not valid:' +
    exceptionHelpers
      .filter(helper => !helper.isValid)
      .reduce((message, helper) => {
        return message + `\n${variableErrorMessage(helper)}`;
      }, '');
  throw new Error(errorMessage);
};
