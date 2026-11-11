// Endereço do motorista (preenchido pelo backend via ViaCEP)
export interface Endereco {
    cep: string;
    logradouro: string;
    numero?: string;
    bairro: string;
    cidade: string;
    uf: string;
}

// Define a classe que representa um Motorista no frontend.
export class Motorista {

    constructor(

        // ID do motorista. null quando ainda não possui ID.
        public id: number | null,

        // Nome do motorista.
        public nome: string,

        // Número da CNH do motorista.
        public cnh: string,

        // Telefone do motorista.
        public telefone: string,

        // Status: FORA_DE_SERVICO, EM_EXPEDIENTE, DIRIGINDO, INTERVALO, INDISPONIVEL, EXCLUIDO.
        public status: string,

        // Endereço (vem do backend; null se não informou CEP).
        public endereco: Endereco | null = null

    ) {}
}

// Propriedades recebidas pelo formulário de Motorista.
export interface MotoristaFormProps {
    // Motorista existente (usado na edição).
    motoristaExistente?: Motorista
}