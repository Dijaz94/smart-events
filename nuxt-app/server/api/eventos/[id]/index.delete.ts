export default defineEventHandler(async (event) => {
    const id_evento = Number(getRouterParam(event, 'id_evento'));
    await prisma.evento.delete({
        where: {id_evento}
})
return{ok:true}
})