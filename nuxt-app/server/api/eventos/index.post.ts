export default defineEventHandler(async (event)=>{{
    const {titulo, fecha, hora, lugar, imagen, valor} = await readBody(event)
    const fechaFormat= Date.parse(`${fecha}T${hora}Z`)

    if (!titulo || !fecha || !hora || !lugar || !imagen || !valor) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan campos obligatorios.',
      })
    }

    await prisma.evento.create({
        data:{
            titulo: titulo.trim(),
            fecha:new Date(fechaFormat),
            lugar:lugar,
            imagen:imagen,
            valor:valor

        }
    })



    return {ok:true}
}})