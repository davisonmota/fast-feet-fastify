import { DeliveryPartnerDAO } from '@src/dao/delivery-partner-dao'
import { DeliveryPartner } from '@src/models/delivery-partner/delivery-partner.model'
import { DeliveryPartnerNotFoundException } from './exceptions/delivery-partner-not-found.exception'

export type GetDeliveryPartnerOutput = Omit<DeliveryPartner, 'password'>

export class GetDeliveryPartnerUseCase {
  constructor(private readonly deliveryPartner: DeliveryPartnerDAO) {}
  async execute(id: string): Promise<GetDeliveryPartnerOutput> {
    const deliveryPartner = await this.deliveryPartner.findById(id)
    if (!deliveryPartner) {
      throw new DeliveryPartnerNotFoundException()
    }

    return {
      id: deliveryPartner.id,
      name: deliveryPartner.name,
      email: deliveryPartner.email,
      cpf: deliveryPartner.cpf,
      createdAt: deliveryPartner.createdAt,
      updatedAt: deliveryPartner.updatedAt,
    }
  }
}
