import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Categoria } from "./categoria.module";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiPath : string = "api/categorias"

  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<Categoria[]>{
    return this._http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategorias)
    );
  }

  getById(id: number): Observable<Categoria> {
    const url = `${this.apiPath}/${id}`;
    return this._http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategoria)
    )
  }

  create(categoria: Categoria): Observable<Categoria>{
    return this._http.post(this.apiPath, categoria).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategoria)
    )
  }

  update(categoria: Categoria): Observable<Categoria>{
    const url = `${this.apiPath}/${categoria.id}`;
    return this._http.put(url, categoria).pipe(
      catchError(this.handleError),
      map(() => categoria)
    )
  }

  delete(id:number):Observable<any>{
    const url = `${this.apiPath}/${id}`;
    return this._http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  //PRIVATE METODOS

  private jsonDataToCategoria(jsonData: any): Categoria{
    return jsonData as Categoria;
  }

  private jsonDataToCategorias(jsonData: any[]): Categoria[]{
    console.log(jsonData);
    const categorias: Categoria[] = [];
    jsonData.forEach(element => categorias.push(element as Categoria));
    return categorias;
  }

  private handleError(error: any): Observable<any>{
    console.log('Erro na requisição', error);
    return throwError(error);
  }
}
