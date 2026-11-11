import { Veiculo } from "../types/veiculo";
import api from "./api";

export async function buscarListaVeiculos(): Promise<Veiculo[]> {
    const dados = await api.get<Veiculo[]>("/veiculos");
    return dados.data;
}

export async function ConsultaVeiculoPorId(id: number): Promise<Veiculo> {
    const dados = await api.get<Veiculo>("/veiculos/" + id);
    return dados.data;
}

export async function salvarVeiculo(veiculo: Veiculo): Promise<Veiculo> {
    const dados = await api.post<Veiculo>("/veiculos", {
        placa: veiculo.placa,
        modelo: veiculo.modelo,
        capacidade: veiculo.capacidade,
        tipo: veiculo.tipo
    });
    return dados.data;
}

export async function atualizarVeiculo(veiculo: Veiculo): Promise<Veiculo> {
    const dados = await api.put<Veiculo>("/veiculos/" + veiculo.id, {
        placa: veiculo.placa,
        modelo: veiculo.modelo,
        capacidade: veiculo.capacidade,
        tipo: veiculo.tipo
    });
    return dados.data;
}

export async function atualizarStatusVeiculo(id: number, novoStatus: string): Promise<void> {
    await api.patch("/veiculos/" + id + "/status", { statusVeiculo: novoStatus });
}

export async function excluirVeiculo(id: number): Promise<void> {
    await api.delete("/veiculos/" + id + "/excluir");
}