import { randomUUID } from 'node:crypto'
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']



export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)

  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, message: 'No se recibió ningún archivo' })
  }

  const file = formData.find((f) => f.name === 'imagen')

  if (!file || !file.data || !file.filename) {
    throw createError({ statusCode: 400, message: 'Archivo inválido' })
  }

  if (!ALLOWED_TYPES.includes(file.type ?? '')) {
    throw createError({ statusCode: 400, message: 'Formato no soportado' })
  }

  if (file.data.length > MAX_FILE_SIZE) {
    throw createError({ statusCode: 400, message: 'La imagen supera 5MB' })
  }



  const ext = path.extname(file.filename) //sacamos la extension
  const uniqueId = randomUUID() //creamos un id unico
  const uniqueFilename = `${uniqueId}${ext}` 

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'eventos') //process.cwd() nos devuelve el directorio raiz en nuxt (en realidad el directorio donde esta trabajando node, que en este caso es raiz)
  await mkdir(uploadsDir, { recursive: true }) //crea el directorio, si se manda que es recursivo, crea todos los directorios intermedios y no fallta ysi el directorio ya existe
  await writeFile(path.join(uploadsDir, uniqueFilename), file.data) //escritura fisica del archivo

  return {
    id: uniqueId,
    url: `/uploads/eventos/${uniqueFilename}`,
  }
})