export default defineEventHandler(async (event) => {
    return await prisma.usuario.findMany({
        orderBy: { apellido: 'asc' },
        select: {
      email: true,
      nombre: true,
      apellido: true,
      rol: true,
      
    }
})
})