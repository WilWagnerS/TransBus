import { Endereco, Motorista } from "@/app/types/motorista";
import api from "./api";

export async function buscarListaMotoristas(): Promise<Motorista[]> {
    const dados = await api.get<Motorista[]>("/motoristas");
    return dados.data;
}

export async function ConsultaMotoristaPorId(id: number): Promise<Motorista> {
    const dados = await api.get<Motorista>("/motoristas/" + id);
    return dados.data;
}

// O backend recebe só CEP + número e busca o resto no ViaCEP
export async function salvarMotorista(motorista: Motorista, cep: string, numero: string): Promise<Motorista> {
    const dados = await api.post<Motorista>("/motoristas", {
        nome: motorista.nome,
        cnh: motorista.cnh,
        telefone: motorista.telefone,
        cep: cep,
        numero: numero
    });
    return dados.data;
}

export async function atualizarMotorista(motorista: Motorista, cep: string, numero: string): Promise<Motorista> {
    const dados = await api.put<Motorista>("/motoristas/" + motorista.id, {
        nome: motorista.nome,
        cnh: motorista.cnh,
        telefone: motorista.telefone,
        cep: cep,
        numero: numero
    });
    return dados.data;
}

export async function atualizarStatusMotorista(id: number, novoStatus: string): Promise<void> {
    await api.patch("/motoristas/" + id + "/status", { statusMotorista: novoStatus });
}

export async function excluirMotorista(id: number): Promise<void> {
    await api.delete("/motoristas/" + id + "/excluir");
}

// INTEGRAÇÃO EXTERNA (Teste 5): o backend consulta o ViaCEP e devolve o endereço
export async function buscarEnderecoPorCep(cep: string): Promise<Endereco> {
    const dados = await api.get<Endereco>("/endereco/" + cep);
    return dados.data;
}