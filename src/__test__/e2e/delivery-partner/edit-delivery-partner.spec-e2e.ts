import { app } from '@src/app'
import { env } from '@src/env'
import { prisma } from '@src/libs/prisma'
import { hash } from 'bcrypt'
import supertest from 'supertest'

describe('EditDeliveryPartnerController', () => {
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

  test('deve ser possível editar os dados do entregador (delivery partner)', async () => {
    const createdAt = new Date('2024-09-06T10:00:00')

    const deliveryPartnerData = await prisma.deliveryPartner.create({
      data: {
        id: 'id-123',
        name: 'Davison Mota',
        email: 'davison@gmail.com',
        cpf: '097.289.890-59',
        password: await hash('123456789', env.HASH_SALT_SECRET),
        createdAt,
      },
    })

    jest
      .useFakeTimers({ advanceTimers: true })
      .setSystemTime(new Date('2024-09-06T11:00:00'))
    const response = await supertest(app.server)
      .put(`/delivery-partner/${deliveryPartnerData.id}/`)
      .send({
        name: 'Updated name',
        email: 'updated-email@gmail.com',
        password: 'updated-123',
      })
      .expect(200)

    const deliveryPartnerUpdatedData = await prisma.deliveryPartner.findUnique({
      where: {
        email: 'updated-email@gmail.com',
      },
    })

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 'id-123',
        name: 'Updated name',
        email: 'updated-email@gmail.com',
        cpf: '097.289.890-59',
        createdAt: createdAt.toISOString(),
      }),
    )
    expect(response.body?.updatedAt).toBeDefined()
    expect(deliveryPartnerUpdatedData?.password).not.toBe(
      deliveryPartnerData.password,
    )
  })
})
