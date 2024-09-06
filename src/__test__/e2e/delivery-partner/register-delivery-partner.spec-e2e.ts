import { app } from '@src/app'
import { prisma } from '@src/libs/prisma'
import supertest from 'supertest'

describe('RegisterDeliveryPartnerController', () => {
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

  test('deve registrar um entregador (delivery partner)', async () => {
    await supertest(app.server)
      .post('/delivery-partner')
      .send({
        name: 'Davison Mota',
        email: 'davison@gmail.com',
        cpf: '097.289.890-59',
        password: '123456789',
      })
      .expect(201)

    const deliveryPartnerData = await prisma.deliveryPartner.findUnique({
      where: {
        email: 'davison@gmail.com',
      },
    })

    expect(deliveryPartnerData?.email).toBe('davison@gmail.com')
    expect(deliveryPartnerData?.password).not.toBe('123456789')
  })
})
