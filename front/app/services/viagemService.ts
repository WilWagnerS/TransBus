import { Viagem } from "../types/viagem";
import api from "./api";

export async function buscarListaViagens(): Promise<Viagem[]> {
    const dados = await api.get<Viagem[]>("/viagens");
    return dados.data;
}

export async function ConsultaViagemPorId(id: number): Promise<Viagem> {
    const dados = await api.get<Viagem>("/viagens/" + id);
    return dados.data;
}

// Monta o corpo no formato do ViagemRequest do backend
function montarRequest(viagem: Viagem) {
    return {
        origem: viagem.origem,
        destino: viagem.destino,
        horarioInicio: viagem.horarioInicio,
        horarioFim: viagem.horarioFim,
        motoristaId: viagem.motoristaId,
        veiculoId: viagem.veiculoId
    };
}

export async function salvarViagem(viagem: Viagem): Promise<Viagem> {
    const dados = await api.post<Viagem>("/viagens", montarRequest(viagem));
    return dados.data;
}

export async function atualizarViagem(viagem: Viagem): Promise<Viagem> {
    const dados = await api.put<Viagem>("/viagens/" + viagem.id, montarRequest(viagem));
    return dados.data;
}

export async function atualizarStatusViagem(id: number, novoStatus: string): Promise<void> {
    await api.patch("/viagens/" + id + "/status", { statusViagem: novoStatus });
}

export async function cancelarViagem(id: number): Promise<void> {
    await api.delete("/viagens/" + id + "/cancelar");
}