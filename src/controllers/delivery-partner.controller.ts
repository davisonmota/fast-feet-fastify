import { EmailAlreadyInUseException } from '@src/use-cases/exceptions/email-already-in-use.exception'
import { makeRegisterDeliveryPartnerUseCase } from '@src/use-cases/factories/make-register-delivery-partner-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const registerDeliveryPartnerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  password: z.string(),
})

export async function deliveryPartnerController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  try {
    const { name, email, cpf, password } = registerDeliveryPartnerSchema.parse(
      req.body,
    )
    const registerDeliveryPartnerUseCase = makeRegisterDeliveryPartnerUseCase()
    await registerDeliveryPartnerUseCase.execute({ name, email, cpf, password })
    return rep.status(201).send()
  } catch (error) {
    if (error instanceof EmailAlreadyInUseException) {
      return rep.status(409).send({ message: error.message })
    }
    throw error
  }
}
