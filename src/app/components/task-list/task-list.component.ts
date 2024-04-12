import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskServiceService } from '../../services/task-service.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{

  tasks: Task[] = []; //proprietà su cui si baserà la generazione dell'html e nella quale salverò i dati ricevuti con la richiesta

  errorMessage = "";
  

  constructor(private ts:TaskServiceService){} //metto a disposizione del component il servizio in cui si trova la chiamata al server grazie alla quale riceverò i dati

  ngOnInit(): void {//definisco in quale momento voglio che i dati vengano effettivamente presi, ovvero al caricamento del componente

    this.ts.getTask() //richiamo il servizio, dunque il metodo che racchiude la richiesta http
      .pipe(//inserisco una pipe per intercettare, tramite catchErrorr, un eventuale errore nella risposta del server alla mia richiesta e gestirlo
        catchError((err:HttpErrorResponse) => {

          this.errorMessage = "Errore nel caricamento dei Task" + err.message; //"costrisco" il messaggio di errore che mostrerò a schermo tramite un tag + interpolazione

          return of(undefined); // in seguito all'intercettazione e alla gestione dell'errore devo ripristinare il flusso tornando un observable, per farlo uso l'operatore OF che ritorna un oggetto vuoto

        })
      )
      .subscribe(dati => {if(dati){ this.tasks = dati}})//l'observable si aspetta sempre un subscribe --> salvo i dati ricevuti nella proprietà su cui si basa la generazione dell'html
    
  }

  completa(task:Task){ //metodo che racchiude la funzione con la quale il padre risponde alla richesta di completamento del figlio --- NB devo passargli il parametro per il confornto di cui sotto

    const taskDaCompletare = this.tasks.find(t => t.id == task.id); //salvo dentro una variabile il task da completare che ho cercato dentro l'array

    if(taskDaCompletare){ taskDaCompletare.completed = true } //se il task esiste nell'array allora la sua proprietà complited verrà settata sul valore true
  }

  
}
