export default defineEventHandler(async (event) => {
    return await prisma.usuario.findMany({
        orderBy: { apellido: 'asc' },
})
})