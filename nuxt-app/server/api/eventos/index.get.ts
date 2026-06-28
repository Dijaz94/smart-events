export default defineEventHandler(async()=>{
    return await prisma.evento.findMany({
        orderBy:{fecha:'desc'}

    })
})