import { DeliveryPartnerDAO } from '@src/dao/delivery-partner-dao'
import { env } from '@src/env'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'
import { EmailAlreadyInUseException } from './exceptions/email-already-in-use.exception'

export type CreateDeliveryPartnerInput = {
  name: string
  cpf: string
  email: string
  password: string
}

export class RegisterDeliveryPartnerUseCase {
  constructor(private readonly deliveryPartner: DeliveryPartnerDAO) {}
  async execute({
    name,
    cpf,
    email,
    password,
  }: CreateDeliveryPartnerInput): Promise<void> {
    const deliveryPartner = await this.deliveryPartner.findByEmail(email)
    if (deliveryPartner) {
      throw new EmailAlreadyInUseException()
    }
    const passwordHashed = await hash(password, env.HASH_SALT_SECRET)

    await this.deliveryPartner.create({
      id: randomUUID(),
      name,
      cpf,
      email,
      password: passwordHashed,
      createdAt: new Date(),
    })
  }
}
