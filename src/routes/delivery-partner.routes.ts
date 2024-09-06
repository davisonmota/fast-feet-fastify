import { deliveryPartnerController } from '@src/controllers/delivery-partner.controller'
import { type FastifyInstance } from 'fastify'

export async function deliveryPartnerRoutes(app: FastifyInstance) {
  app.post('/delivery-partner', deliveryPartnerController)
}
