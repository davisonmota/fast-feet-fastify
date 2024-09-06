import { deleteDeliveryPartnerController } from '@src/controllers/delete-delivery-partner.controller'
import { editDeliveryPartnerController } from '@src/controllers/edit-delivery-partner.controller'
import { getDeliveryPartnerController } from '@src/controllers/get-delivery-partner.controller'
import { registerDeliveryPartnerController } from '@src/controllers/register-delivery-partner.controller'
import { type FastifyInstance } from 'fastify'

export async function deliveryPartnerRoutes(app: FastifyInstance) {
  app.put(
    '/delivery-partner/:deliveryPartnerId/',
    editDeliveryPartnerController,
  )
  app.delete(
    '/delivery-partner/:deliveryPartnerId/',
    deleteDeliveryPartnerController,
  )
  app.post('/delivery-partner', registerDeliveryPartnerController)
  app.get('/delivery-partner/:deliveryPartnerId/', getDeliveryPartnerController)
}
