// Importa a classe Motorista para que a Viagem possa
// representar também o motorista relacionado a ela.
import { Motorista } from "./motorista";

// Importa a classe Onibus para que a Viagem possa
// representar também o ônibus relacionado a ela.
import { Onibus } from "./onibus";

// Define a classe que representa uma viagem no frontend.
export class Viagem {

    // Construtor responsável por receber e inicializar
    // os dados principais da viagem.
    constructor(

        // ID da viagem.
        // Pode ser um número ou null quando ainda não possui ID.
        public id: number | null,

        // Local de origem da viagem.
        public origem: string,

        // Local de destino da viagem.
        public destino: string,

        // Horário de início da viagem.
        // Está representado como string no frontend.
        public horarioInicio: string,

        // Horário de término da viagem.
        // Também está representado como string.
        public horarioFim: string,

        // ID do motorista relacionado à viagem.
        public motoristaId: number,

        // ID do ônibus relacionado à viagem.
        public onibusId: number,

        // Status atual da viagem.
        public status: string

    ) {}

    // Representa o motorista completo relacionado à viagem.
    //
    // O "?" significa que essa propriedade é opcional.
    // Portanto, ela pode existir ou não no objeto.
    public motorista?: Motorista;

    // Representa o ônibus completo relacionado à viagem.
    //
    // O "?" significa que essa propriedade também é opcional.
    public onibus?: Onibus;
}

// Define as propriedades que podem ser recebidas
// pelo componente de formulário de viagem.
export interface ViagemFormProps{

    // viagemExistente é uma propriedade opcional.
    //
    // Quando informada, contém os dados de uma viagem existente,
    // normalmente utilizada para carregar os dados durante uma edição.
    viagemExistente?:Viagem
}