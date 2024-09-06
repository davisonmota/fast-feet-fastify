export class EmptyFieldsException extends Error {
  constructor() {
    super('Empty fields to be updated.')
    this.name = this.constructor.name
  }
}
