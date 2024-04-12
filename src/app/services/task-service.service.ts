import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskDTO } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http:HttpClient) {} //metto a disposizione del servizio l'oggetto necessario per la chiamata http, ovvero httpClient

  private BASE_URL= "http://localhost:3000"; //salvo la base dell'URL in una variabile

  getTask(): Observable<Task[]>{ //ho effettuato la chiamata al server per ottenere dati --> observable + tipo del dato che mi arrirerà + return + this.http.get + tipo dato + URL server

    return this.http.get<Task[]>(`${this.BASE_URL}/task`)

  }

  addTask(task: TaskDTO): Observable<Task>{ //ho effettuato una chiamata post al server per aggiungere dati --> il singolo dato da inserire costituisce un parametro della funzione e sarà di un certo tipo definito nei modelli (in questo caso TaskDTO che differisce da Task per la mancanza della proprietà id che verrà assegnata al dato stesso dal server). NB l'obervable si aspetta un Task come risposta poichè con questo tipo di dato il server risponderà alla richiesta

    // console.log(task)
    return this.http.post<Task>(`${this.BASE_URL}/task`, task) //con l'indizzo mando il dato da salvare
  }

  deleteTask(id:number): Observable<any>{//ho effettuato una chiamata delete al server per cancellare dati --> il singolo dato da cancellare verrà individuato grazie all'id che viene passato come parametro della funzione. NB l'observable si aspetta un any come risposta poichè il server risponderà con un oggetto vuoto

    return this.http.delete(`${this.BASE_URL}/task/` + id)//non ho ripetuto any perchè è sottointeso (solo nel caso di any ometto!!)
  }
}
