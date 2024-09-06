import { DeliveryPartnerDAO } from '@src/dao/delivery-partner-dao'
import { env } from '@src/env'
import { DeliveryPartner } from '@src/models/delivery-partner.model'
import { UpdateDeliveryPartner } from '@src/models/update-delivery-partner.model'
import { hash } from 'bcrypt'
import { DeliveryPartnerNotFoundException } from './exceptions/delivery-partner-not-found.exception'
import { EmptyFieldsException } from './exceptions/empty-fields.exception'

export type EditDeliveryPartnerInput = Omit<UpdateDeliveryPartner, 'updatedAt'>

export type EditDeliveryPartnerOutput = Omit<DeliveryPartner, 'password'>

export class EditDeliveryPartnerUseCase {
  constructor(private readonly deliveryPartner: DeliveryPartnerDAO) {}
  async execute(
    id: string,
    data: EditDeliveryPartnerInput,
  ): Promise<EditDeliveryPartnerOutput> {
    if (Object.keys(data).length === 0) {
      throw new EmptyFieldsException()
    }
    let deliveryPartner = await this.deliveryPartner.findById(id)
    if (!deliveryPartner) {
      throw new DeliveryPartnerNotFoundException()
    }

    const password = data.password
      ? await hash(data.password, env.HASH_SALT_SECRET)
      : data.password

    deliveryPartner = await this.deliveryPartner.update(id, {
      ...data,
      password,
      updatedAt: new Date(),
    })

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
