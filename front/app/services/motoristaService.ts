import { Motorista } from "@/app/types/motorista";
import api from "./api";

export async function buscarListaMotoristas(): Promise<Motorista[]> {

    const dados = await api.get<Motorista[]>("http://localhost:8080/motoristas/");

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

export async function deletarMotorista(id: number): Promise<number> {

    var dados = await api.delete('http://localhost:8080/motoristas/' + id + '/excluir');
    return dados.status;
}

export async function atualizarStatusMotorista(motorista: Motorista): Promise<void> {

    var novoStatus = {};
    if (motorista.status === "EM_EXPEDIENTE") {
        novoStatus = { statusMotorista: "DIRIGINDO" }
    } else {
        novoStatus = { statusMotorista: "INDISPONIVEL" }
    }
    var dadosRetorno = await api.patch('http://localhost:8080/motoristas/' + motorista.id + '/status', novoStatus);

    if (dadosRetorno.status == 200) {
        alert("Atualizado com sucesso!");

    } else {
        alert(dadosRetorno.data);

        return
    }
}

export async function ConsultaMotoristaPorId(id: number): Promise<Motorista> {
    const valorMotoristaBack = await api.get<Motorista>('http://localhost:8080/motoristas/' + id);
    return valorMotoristaBack.data;
}

export async function atualizarMotorista(motorista: Motorista): Promise<number>{
    var dadosRetorno = await api.put<number>('http://localhost:8080/motoristas/'+motorista.id, motorista);
    return dadosRetorno.data;
}

export async function salvarMotorista(motorista: Motorista): Promise<number>{
    var dadosRetorno = await api.post<number>('http://localhost:8080/motoristas/', motorista);
    return dadosRetorno.data;
}