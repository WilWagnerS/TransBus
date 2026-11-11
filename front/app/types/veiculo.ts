// Define a classe que representa um veículo no frontend.
export class Veiculo {

    constructor(

        // ID do veículo. null quando ainda não possui ID.
        public id: number | null,

        // Placa do veículo.
        public placa: string,

        // Modelo do veículo.
        public modelo: string,

        // Capacidade (ex.: "44 passageiros" ou "30 toneladas").
        public capacidade: string,

        // Tipo: ONIBUS ou CAMINHAO.
        public tipo: string,

        // Status: GARAGEM, EM_SERVICO, AVARIADO, EM_MANUTENCAO, EXCLUIDO.
        public status: string

    ) { }
}

// Propriedades recebidas pelo formulário de veículo.
export interface VeiculoFormProps {
    // Veículo existente (usado na edição).
    veiculoExistente?: Veiculo | null
}