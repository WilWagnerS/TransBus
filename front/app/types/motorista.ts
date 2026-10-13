// Define a classe que representa um Motorista no frontend.
export class Motorista {

    // Construtor responsável por receber e inicializar
    // os dados do motorista.
    constructor(

        // ID do motorista.
        // number representa um número e null significa que
        // o motorista pode ainda não possuir um ID.
        public id: number | null,

        // Nome do motorista.
        public nome: string,

        // Número da CNH do motorista.
        public cnh: string,

        // Telefone do motorista.
        public telefone: string,

        // Status atual do motorista.
        public status: string

    ) {}
}  

// Define as propriedades que podem ser recebidas
// pelo componente de formulário de Motorista.
export interface MotoristaFormProps{

    // motoristaExistente é opcional devido ao "?".
    //
    // Quando existir um motorista, ele será utilizado
    // pelo formulário para carregar os dados de edição.
    motoristaExistente?:Motorista
}