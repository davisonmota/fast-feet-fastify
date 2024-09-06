export class DeliveryPartnerNotFoundException extends Error {
  constructor() {
    super('Delivery partner not found.')
    this.name = this.constructor.name
  }
}
