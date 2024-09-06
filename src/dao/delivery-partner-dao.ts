import { PrismaClient } from '@prisma/client'
import { CreateDeliveryPartner } from '@src/models/create-delivery-partner.model'
import { DeliveryPartner } from '@src/models/delivery-partner.model'

export class DeliveryPartnerDAO {
  private readonly model: PrismaClient['deliveryPartner']
  constructor(prisma: PrismaClient) {
    this.model = prisma.deliveryPartner
  }

  async create(data: CreateDeliveryPartner): Promise<void> {
    await this.model.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<DeliveryPartner | null> {
    return await this.model.findUnique({
      where: {
        email,
      },
    })
  }
}
