import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { deliveryPartnerRoutes } from './routes/delivery-partner.routes'

const app = fastify()

app.register(deliveryPartnerRoutes)

app.setErrorHandler((error, _request, replay) => {
  if (error instanceof ZodError) {
    return replay
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV === 'production') {
    // TODO: log an external logger
  } else {
    console.error(error)
  }
  return replay.status(500).send({ error: 'Internal server error' })
})

export { app }
