import { DeliveryPartnerDAO } from '@src/dao/delivery-partner-dao'
import { prisma } from '@src/libs/prisma'
import { GetDeliveryPartnerUseCase } from '../get-delivery-partner.use-case'

export function makeGetDeliveryPartnerUseCase(): GetDeliveryPartnerUseCase {
  const deliveryPartner = new DeliveryPartnerDAO(prisma)
  return new GetDeliveryPartnerUseCase(deliveryPartner)
}
