import bcrypt from 'bcryptjs'
export default defineEventHandler(async (event) => {
    const {email, password, nombre, apellido,rol} = await readBody(event)
    //hash the password
    const hash = await bcrypt.hash(password, 12)

    const usuario = await prisma.usuario.create({
        data:{
            email,  
            password: hash,
            nombre,
            apellido,
            rol
        }
    })
    return {
        ok:true,
        usuario
    }
        
})