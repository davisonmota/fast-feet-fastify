import { DeliveryPartnerNotFoundException } from '@src/use-cases/delivery-partner/exceptions/delivery-partner-not-found.exception'
import { makeGetDeliveryPartnerUseCase } from '@src/use-cases/delivery-partner/factories/make-get-delivery-partner-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const getDeliveryPartnerParamsSchema = z.object({
  deliveryPartnerId: z.string(),
})

export async function getDeliveryPartnerController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  try {
    const { deliveryPartnerId } = getDeliveryPartnerParamsSchema.parse(
      req.params,
    )
    const getDeliveryPartnerUseCase = makeGetDeliveryPartnerUseCase()
    const deliveryPartner =
      await getDeliveryPartnerUseCase.execute(deliveryPartnerId)

    return rep.status(200).send({ deliveryPartner })
  } catch (error) {
    if (error instanceof DeliveryPartnerNotFoundException) {
      return rep.status(400).send({ message: error.message })
    }
    throw error
  }
}
