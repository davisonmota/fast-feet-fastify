import { CreateDeliveryPartner } from './create-delivery-partner.model'

export interface DeliveryPartner extends CreateDeliveryPartner {
  updatedAt: Date | null
}
