// Define a classe que representa uma viagem no frontend.
export class Viagem {

    constructor(

        // ID da viagem. null quando ainda não possui ID.
        public id: number | null,

        // Local de origem da viagem.
        public origem: string,

        // Local de destino da viagem.
        public destino: string,

        // Horário de início (formato "2026-11-10T08:00").
        public horarioInicio: string,

        // Horário de término (formato "2026-11-10T11:30").
        public horarioFim: string,

        // ID do motorista relacionado à viagem.
        public motoristaId: number | null,

        // ID do veículo relacionado à viagem.
        // null = desvinculada (veículo foi marcado como AVARIADO).
        public veiculoId: number | null,

        // Status: AGENDADA, EM_ANDAMENTO, CONCLUIDA, COM_PROBLEMA, CANCELADA.
        public status: string,

        // Nome do motorista (vem pronto do backend, para a tabela).
        public motoristaNome?: string,

        // Placa do veículo (vem pronta do backend, para a tabela).
        public veiculoPlaca?: string

    ) {}
}

// Propriedades recebidas pelo formulário de viagem.
export interface ViagemFormProps {
    // Viagem existente (usada na edição).
    viagemExistente?: Viagem
}