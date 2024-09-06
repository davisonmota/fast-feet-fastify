import { app } from '@src/app'
import { prisma } from '@src/libs/prisma'
import supertest from 'supertest'

describe('GetDeliveryPartnerController', () => {
  beforeAll(async () => {
    await app.ready()
    await prisma.$connect()
  })

  afterAll(async () => {
    await app.close()
    await prisma.$disconnect()
  })

  afterEach(async () => {
    await prisma.deliveryPartner.deleteMany()
  })

  beforeEach(async () => {
    await prisma.deliveryPartner.deleteMany()
  })

  test('deve ser possível deletar um entregador (delivery partner)', async () => {
    const deliveryPartnerData = await prisma.deliveryPartner.create({
      data: {
        id: 'id-123',
        name: 'Davison Mota',
        email: 'davison@gmail.com',
        cpf: '097.289.890-59',
        password: 'password',
        createdAt: new Date(),
      },
    })

    await supertest(app.server)
      .get(`/delivery-partner/${deliveryPartnerData.id}/`)
      .send()
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual({
          deliveryPartner: expect.objectContaining({
            id: 'id-123',
            name: 'Davison Mota',
            email: 'davison@gmail.com',
            cpf: '097.289.890-59',
          }),
        })
      })
  })
})
