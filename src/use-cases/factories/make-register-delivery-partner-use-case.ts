import { DeliveryPartnerDAO } from '@src/dao/delivery-partner-dao'
import { prisma } from '@src/libs/prisma'
import { RegisterDeliveryPartnerUseCase } from '../register-delivery-partner.use-case'

export function makeRegisterDeliveryPartnerUseCase(): RegisterDeliveryPartnerUseCase {
  const deliveryPartner = new DeliveryPartnerDAO(prisma)
  return new RegisterDeliveryPartnerUseCase(deliveryPartner)
}
