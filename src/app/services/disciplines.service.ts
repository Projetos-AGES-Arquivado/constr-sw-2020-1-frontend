import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Building } from '../models/Building';
import { Discipline } from '../models/Discipline'
import { DisciplineClass } from '../models/DisciplineClass';
import { Lesson } from '../models/Lesson';
import { Room } from '../models/Room';

@Injectable({
  providedIn: 'root'
})
export class DisciplinesService {

  url = 'http://18.230.151.22:3000'; 

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os prédios
  getDiscipline(): Observable<Discipline[]> {
    return this.httpClient.get<Discipline[]>(this.url + '/courses')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getClasses(disciplineID): Observable<DisciplineClass[]> {
    return this.httpClient.get<DisciplineClass[]>(this.url + `/classes?course=${disciplineID}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getLessons(classID): Observable<Lesson[]> {
    console.log(classID);
    return this.httpClient.get<Lesson[]>(this.url + `/lessons?class_id=${classID}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  postLesson(lesson): Observable<Lesson> {
    const currentLesson:Lesson = lesson;
    console.log(JSON.stringify(currentLesson))
    return this.httpClient.post<Lesson>(this.url + '/lessons', JSON.stringify(currentLesson), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }
  
  deleteLesson(lessonID:string) {
    return this.httpClient.delete(this.url + '/lessons/' + lessonID, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )

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
