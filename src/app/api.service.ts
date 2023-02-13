import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {lastValueFrom, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  /**
   * Fetch the list of pokemons from API
   * @param offset how many records to skip
   * @param limit how many records to return
   * @returns list of pokemons
   *
   * @url https://pokeapi.co/docs/v2#resource-listspagination-section
   */
  get(page = 1, limit = 6) {
    const offset = (page - 1) * limit;
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  }

  /**
   * Fetch a single pokemon from API
   * @param id id or name of the pokemon
   * @returns pokemon
   *
   * @url https://pokeapi.co/docs/v2#pokemon
   */
  getOne(id: number | string): Observable<any>{
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
