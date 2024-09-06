import { EmptyFieldsException } from '@src/use-cases/delivery-partner/exceptions/empty-fields.exception'
import { makeEditDeliveryPartnerUseCase } from '@src/use-cases/delivery-partner/factories/make-edit-delivery-partner-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const editDeliveryPartnerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  cpf: z.string().optional(),
  password: z.string().optional(),
})

const editDeliveryPartnerParamsSchema = z.object({
  deliveryPartnerId: z.string(),
})

export async function editDeliveryPartnerController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  try {
    const { deliveryPartnerId } = editDeliveryPartnerParamsSchema.parse(
      req.params,
    )
    const editDeliveryPartnerData = editDeliveryPartnerSchema.parse(req.body)

    const editDeliveryPartnerUseCase = makeEditDeliveryPartnerUseCase()
    const deliveryPartnerUpdated = await editDeliveryPartnerUseCase.execute(
      deliveryPartnerId,
      editDeliveryPartnerData,
    )
    return rep.status(200).send(deliveryPartnerUpdated)
  } catch (error) {
    if (error instanceof EmptyFieldsException) {
      return rep.status(400).send({ message: error.message })
    }
    throw error
  }
}
