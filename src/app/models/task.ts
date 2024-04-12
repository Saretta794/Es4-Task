export interface Task {

    title: string,
    cartegoria: string,
    completed: boolean,
    id: number

}

export class TaskDTO { //DTO = data transfer object = classe creata per trasportare dei dati (convenzione)

    constructor(

        public title: string = "",
        public cartegoria: string = "",
        public completed: boolean = false

    ){}
}