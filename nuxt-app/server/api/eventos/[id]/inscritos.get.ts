import type { Inscrito } from '~/types/inscrito'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'ID de evento es requerido' })
  }

  try {
    const inscritos = await prisma.inscrito.findMany({
      where: { id_evento: Number(id) },
      orderBy: { apellido: 'asc' },
    })

    return inscritos
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: 'No se pudieron cargar los asistentes.' })
  }
})