/**
 * Entidad que mappea la informacion de los animes con los microservicios.
 */
export class Anime {
    /**
     * Identificador del anime.
     */
    public id: number;
    /**
     * Nombre del anime.
     */
    public nombre: string;
    /**
     * Género del anime.
     */
    public genero: string;
    /**
     * Fecha de creación del anime.
     */
    public fechaCreacion: Date;
}