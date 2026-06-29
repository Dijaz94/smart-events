import type { Evento } from "./eventos"

export interface Inscrito {
  id_inscrito: number
  email: string
  nombre: string
  apellido: string
  id_evento: number
}
export interface InscritoAlEvento extends Inscrito {
  evento: Evento
}