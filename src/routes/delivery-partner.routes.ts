import { editDeliveryPartnerController } from '@src/controllers/edit-delivery-partner.controller'
import { registerDeliveryPartnerController } from '@src/controllers/register-delivery-partner.controller'
import { type FastifyInstance } from 'fastify'

export async function deliveryPartnerRoutes(app: FastifyInstance) {
  app.put(
    '/delivery-partner/:deliveryPartnerId/',
    editDeliveryPartnerController,
  )
  app.post('/delivery-partner', registerDeliveryPartnerController)
}
