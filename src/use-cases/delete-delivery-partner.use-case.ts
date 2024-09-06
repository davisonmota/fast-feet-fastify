import { DeliveryPartnerDAO } from '@src/dao/delivery-partner-dao'
import { DeliveryPartnerNotFoundException } from './exceptions/delivery-partner-not-found.exception'

export class DeleteDeliveryPartnerUseCase {
  constructor(private readonly deliveryPartner: DeliveryPartnerDAO) {}
  async execute(id: string): Promise<void> {
    const deliveryPartner = await this.deliveryPartner.findById(id)
    if (!deliveryPartner) {
      throw new DeliveryPartnerNotFoundException()
    }
    await this.deliveryPartner.deleteById(id)
  }
}
