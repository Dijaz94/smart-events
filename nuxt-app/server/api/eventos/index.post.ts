export default defineEventHandler(async (event)=>{{
    const {titulo, fecha, hora, lugar, imagen, valor} = await readBody(event)
    const fechaFormat= Date.parse(`${fecha}T${hora}Z`)


    if (!titulo || !fecha || !hora || !lugar || !imagen || !valor) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan campos obligatorios.',
      })
    }
    const fechaHoy = new Date()
  
    const fechaEvento = new Date(fechaFormat)
    if(fechaHoy>fechaEvento){
      throw createError({
        statusCode: 422,
        statusMessage: 'Se requiere que la fecha sea posterior al día de hoy',
      })
    }


    await prisma.evento.create({
        data:{
            titulo: titulo.trim(),
            fecha:fechaEvento,
            lugar:lugar,
            imagen:imagen,
            valor:valor

        }
    })



    return {ok:true}
}})