export class Viagem {

    constructor(

        public id: number | null,

        public origem: string,

        public destino: string,

        public horarioInicio: string,

        public horarioFim: string,

        public motoristaId: number,

        public onibusId: number,

        public status: string

    ) { }

}