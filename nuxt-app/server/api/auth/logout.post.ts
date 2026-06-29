import bcrypt from "bcryptjs";

export default defineEventHandler(async(event)=>{
const {email,password}= await readBody(event)


if (!email || !password){
    throw createError({statusCode:401, message:"Credenciales no válidas"})
    
}
const usuario = await prisma.usuario.findUnique({
        where:{email}
    })

if (!usuario){
     throw createError({statusCode:401, message:"Credenciales no válidas"})
}

})