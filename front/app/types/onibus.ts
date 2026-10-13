// Define a classe que representa um ônibus no frontend.
export class Onibus {

    // Construtor responsável por receber e inicializar
    // os dados do ônibus.
    constructor(

        // ID do ônibus.
        // Pode ser um número ou null quando ainda não possui ID.
        public id: number | null,

        // Placa do ônibus.
        public placa: string,

        // Modelo do ônibus.
        public modelo: string,

        // Capacidade do ônibus.
        public capacidade: string,

        // Status atual do ônibus.
        public status: string

    ) {}
}

// Define as propriedades que podem ser recebidas
// pelo componente de formulário de ônibus.
export interface OnibusFormProps{

    // onibusExistente é uma propriedade opcional.
    //
    // Pode receber um objeto Onibus ou null.
    //
    // É utilizada principalmente quando o formulário
    // está sendo usado para editar um ônibus existente.
    onibusExistente?:Onibus | null
}