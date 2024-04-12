import { Component } from '@angular/core';
import { TaskDTO } from '../../models/task';
import { TaskServiceService } from '../../services/task-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {

  taskAggiunto: TaskDTO = new TaskDTO(); //proprietà il cui valore è pari ad una nuova istanza della classe TaskDTO in cui, a sua volta, i valori delle proprietà della classe verranno riempiti con ciò che viene inserito negli input grazie al data binding (per quanto riguarta title e categoria, per completed rimane il valore di default inizialmente --> NB la classe TaskDTO definita nei modelli ha già dei valori di default, altrimenti avrei dovuto inserire i valori delle proprietà fra le parentesi tonde qui)

  constructor(private ts:TaskServiceService){} //private router: Router --> non mi serve perchè faccio ricaricare la pagnia

  aggiungiTask(){//funzione legata al form creato per l'aggiunta del task, che richiama il service che a sua volta realizza la chiamata http post

    this.ts.addTask(this.taskAggiunto)
      .subscribe(dati => {

        console.log(dati)
        this.taskAggiunto = new TaskDTO(); //svoto form
        // this.router.navigate(['/task']); // NON RICARICA LA PAGINA REINDIRIZZANDO SULLA STESSA ROTTA!

        window.location.reload()//riscarico la pagina per visualizzare il nuovo task aggiunto
      }) 
     
  }

}
