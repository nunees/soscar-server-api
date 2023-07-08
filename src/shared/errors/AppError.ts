export class AppError {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

// interface fieldErrorStructure {
//   field: string;
//   description: string;
// }

// export class AppError {
//   public readonly statusCode: number;
//   public readonly fields: fieldErrorStructure[];

//   constructor(statusCode = 400, fields: fieldErrorStructure[]) {
//     this.statusCode = statusCode;
//     this.fields = fields;
//   }
// }
