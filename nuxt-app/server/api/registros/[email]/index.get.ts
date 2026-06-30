import type { InscritoAlEvento } from "~/types/inscrito"

export default defineEventHandler(async (event)=> {
    const email = getRouterParam(event, 'email')
    
    if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Email es requerido' })
  }

  const inscripciones = await prisma.inscrito.findMany({
    where: { email },
    include: { evento: true },
    orderBy: { evento: { fecha: 'desc' } },
  })

  return inscripciones
})
