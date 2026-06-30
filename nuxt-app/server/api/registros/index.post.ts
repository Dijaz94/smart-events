export default defineEventHandler(async (event)=>{
   const {nombre, apellido, email, evento} = await readBody(event)

  if (!nombre || !apellido || !email || !evento) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Faltan campos requeridos'
    })

  }

  const id_evento=Number(evento)

  const existe = await prisma.inscrito.findFirst({
    where:{
      id_evento:id_evento,
      email:email
    }
  })

    if (existe) {
      throw createError({
        statusCode:409,
        statusMessage:"Ya se encuentra inscrito para este evento"
      })
    }
 

   await prisma.inscrito.create({
    data:{
        email:email.trim(),
        nombre:nombre.trim(),
        apellido:apellido.trim(),
        id_evento:id_evento
    }
   })

   return {ok:true}

})