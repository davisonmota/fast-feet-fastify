import { PrismaClient } from '@prisma/client'
import { CreateDeliveryPartner } from '@src/models/delivery-partner/create-delivery-partner.model'
import { DeliveryPartner } from '@src/models/delivery-partner/delivery-partner.model'
import { UpdateDeliveryPartner } from '@src/models/delivery-partner/update-delivery-partner.model'

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

  async findById(id: string): Promise<DeliveryPartner | null> {
    return await this.model.findUnique({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string): Promise<DeliveryPartner | null> {
    return await this.model.findUnique({
      where: {
        email,
      },
    })
  }

  async update(
    id: string,
    data: UpdateDeliveryPartner,
  ): Promise<DeliveryPartner> {
    return await this.model.update({
      where: {
        id,
      },
      data,
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.model.delete({
      where: {
        id,
      },
    })
  }
}
