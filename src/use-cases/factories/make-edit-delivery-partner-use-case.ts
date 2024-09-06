import { DeliveryPartnerDAO } from '@src/dao/delivery-partner-dao'
import { prisma } from '@src/libs/prisma'
import { EditDeliveryPartnerUseCase } from '../edit-delivery-partner.use-case'

export function makeEditDeliveryPartnerUseCase(): EditDeliveryPartnerUseCase {
  const deliveryPartner = new DeliveryPartnerDAO(prisma)
  return new EditDeliveryPartnerUseCase(deliveryPartner)
}
