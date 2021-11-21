import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anime } from '../model/Anime';
/**
 * SERVICIO PARA REALIZAR LA LOGICA DE NEGOCIO DE ANIMES.
 */
@Injectable({
  providedIn: 'root'
})
export class AnimesService {
  /**
   * ENDPOINT PARA CONSUMIR EL MICROSERVICIO DE ANIMES.
   */
  private baseUrl = 'http://localhost:8090/animes';

  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  /**
   * Constructor default.
   */
  constructor(private httpClient: HttpClient) { }
  /**
   * Metodo que permite consultar los registros de animes.
   */
  consultarAnimes(): Observable<Anime[]> {
    return this.httpClient.get<Anime[]>(`${this.baseUrl}/consultarAnimes`);
  }

  /**
   * Metodo que permite guardar un anime.
   * @param anime registro de anime a enviar al microservicio.
   */
  guardarAnime(anime: Anime): Observable<Anime> {
    return this.httpClient.post<Anime>(`${this.baseUrl}/guardarAnime`, anime, {headers: this.headers});
  }

  /**
   * Metodo que permite actualizar un anime.
   * @param anime registro de anime a enviar al microservicio.
   */
  actualizarAnime(anime: Anime): Observable<Anime> {
    return this.httpClient.put<Anime>(`${this.baseUrl}/actualizarAnime`, anime, {headers: this.headers});
  }

  /**
   * Metodo que permite eliminar un anime.
   * @param id identificador del anime a
   */
  eliminarAnime(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/eliminarAnime/${id}`);
  }

}
