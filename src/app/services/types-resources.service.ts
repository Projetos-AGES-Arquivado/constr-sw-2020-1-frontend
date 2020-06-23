import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Resources } from '../models/resources.model';

@Injectable({
  providedIn: 'root'
})
export class TypesResourcesService {

  url = 'http://52.91.97.146:3456'; 

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  deleteResourceTypes(idResource): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/resources-types/' + idResource)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  patchResourceTypes(idResource, resourceType): Observable<any> {
    return this.httpClient.patch<any>(this.url + '/resources-types/' + idResource, { resourceType })
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  putResourceTypes(idResource, resourceType): Observable<any> {
    return this.httpClient.put<any>(this.url + '/resources-types/' + idResource, { resourceType })
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem todos os tipos
  getResourcesTypes(): Observable<Resources[]> {
    return this.httpClient.get<Resources[]>(this.url + '/resources-types')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }


  // Obtem todos os prédios
  getResources(): Observable<Resources[]> {
    return this.httpClient.get<Resources[]>(this.url + '/resources')
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