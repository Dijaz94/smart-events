// server/api/inscritos/[id]/index.delete.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'ID es requerido' })
  }

  try {
    await prisma.inscrito.delete({
      where: { id_inscrito: Number(id) },
    })

    return { ok: true }
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: 'No se pudo eliminar el asistente.' })
  }
})