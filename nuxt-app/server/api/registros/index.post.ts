export default defineEventHandler(async (event)=>{
   const {nombre, apellido, email, evento} = await readBody(event)

  if (!nombre || !apellido || !email || !evento) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Faltan campos requeridos'
    })
  }

   await prisma.inscrito.create({
    data:{
        email:email.trim(),
        nombre:nombre.trim(),
        apellido:apellido.trim(),
        id_evento:Number(evento)
    }
   })

   return {ok:true}

})