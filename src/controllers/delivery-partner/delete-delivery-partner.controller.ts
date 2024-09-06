import { DeliveryPartnerNotFoundException } from '@src/use-cases/delivery-partner/exceptions/delivery-partner-not-found.exception'
import { makeDeleteDeliveryPartnerUseCase } from '@src/use-cases/delivery-partner/factories/make-delete-delivery-partner-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const deleteDeliveryPartnerParamsSchema = z.object({
  deliveryPartnerId: z.string(),
})

export async function deleteDeliveryPartnerController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  try {
    const { deliveryPartnerId } = deleteDeliveryPartnerParamsSchema.parse(
      req.params,
    )
    const deleteDeliveryPartnerUseCase = makeDeleteDeliveryPartnerUseCase()
    await deleteDeliveryPartnerUseCase.execute(deliveryPartnerId)

    return rep.status(200).send()
  } catch (error) {
    if (error instanceof DeliveryPartnerNotFoundException) {
      return rep.status(400).send({ message: error.message })
    }
    throw error
  }
}
