import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Entry } from "./entry.module";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath : string = "api/entries"

  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<Entry[]>{
    return this._http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    );
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;
    return this._http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  create(entry: Entry): Observable<Entry>{
    return this._http.post(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  update(entry: Entry): Observable<Entry>{
    const url = `${this.apiPath}/${entry.id}`;
    return this._http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
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

  private jsonDataToEntry(jsonData: any): Entry{
    return jsonData as Entry;
  }

  private jsonDataToEntries(jsonData: any[]): Entry[]{
    console.log(jsonData);
    const entries: Entry[] = [];
    jsonData.forEach(element => entries.push(element as Entry));
    return entries;
  }

  private handleError(error: any): Observable<any>{
    console.log('Erro na requisição', error);
    return throwError(error);
  }
}
