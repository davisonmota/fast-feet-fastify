import { DeliveryPartnerDAO } from '@src/dao/delivery-partner-dao'
import { prisma } from '@src/libs/prisma'
import { DeleteDeliveryPartnerUseCase } from '../delete-delivery-partner.use-case'

export function makeDeleteDeliveryPartnerUseCase(): DeleteDeliveryPartnerUseCase {
  const deliveryPartner = new DeliveryPartnerDAO(prisma)
  return new DeleteDeliveryPartnerUseCase(deliveryPartner)
}
