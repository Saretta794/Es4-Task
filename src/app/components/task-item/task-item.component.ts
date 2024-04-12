import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Task } from '../../models/task';
import { TaskServiceService } from '../../services/task-service.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {

  @Input()//ho applicato il decoratore alla proprietà task, ovvero la proprietà su cui si basa l'html, così da estenderla
  task?:Task;

  @Output()//ho applicato il deciratore per permettere al figli di comunicare con il padre
  onRichiestaCompletamento = new EventEmitter<Task>()// "preparo l'allarme"

  richiediCompletamento(){// la funzione fà "partire l'allarme" che ho appena preparato tramite il metodo emit a cui passo il task di cui il componente stesso si sta occupando

    this.onRichiestaCompletamento.emit(this.task)

  }

  constructor(private ts:TaskServiceService){} // ho reso diponibile il servizio al componente tramiete il costruttore

  rimuoviTask(){//funzione che utilizza il metodo del servizio con la richiesta di rimozione del dato al server 

    if(confirm("Sei sicuro?")){

    this.ts.deleteTask(this.task!.id)
      .subscribe(risultato =>  window.location.reload())//la pagina viene ricaricata per visualizzare a schermo la cancellazione

    }
  }
}
