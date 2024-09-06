export class EmailAlreadyInUseException extends Error {
  constructor() {
    super('Email already in use.')
    this.name = this.constructor.name
  }
}
