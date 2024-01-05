/**
 * Class to handle errors
 * @class AppError
 * @extends Error
 * @param {string} message - Error message to be displayed
 * @param {number} statusCode - Error status code to be displayed, default is 400 (Bad Request)
 * @returns {AppError} - Returns a new AppError object
 * @example throw new AppError("User not found", 404);
 */
export class AppError {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

