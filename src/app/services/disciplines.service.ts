import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Building } from '../models/Building';
import { Room } from '../models/Room';

@Injectable({
  providedIn: 'root'
})
export class DisciplinesService {

  url = 'https://stark-gorge-03313.herokuapp.com'; 

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os prédios
  getBuilding(): Observable<Building[]> {
    return this.httpClient.get<Building[]>(this.url + '/buildings')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getClasses(disciplineID): Observable<Room[]> {
    console.log(this.url + `/buildings/${disciplineID}/rooms`)
    return this.httpClient.get<Room[]>(this.url + `/buildings/${disciplineID}/rooms`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


}
