import { Viagem } from "../types/viagem";
import api from "./api";

export async function buscarListaViagens(): Promise<Viagem[]> {

    const dados = await api.get<Viagem[]>("http://localhost:8080/viagens/");

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

export async function deletarViagem(id: number): Promise<number> {

    var dados = await api.delete('http://localhost:8080/viagens/' + id + '/excluir');
    return dados.status;
}

export async function atualizarStatusViagem(viagem: Viagem): Promise<void> {

    var novoStatus = {};
    if (viagem.status === "EM_ANDAMENTO") {
        novoStatus = { statusViagem: "COM_PROBLEMA" }
    } else {
        novoStatus = { statusViagem: "CONCLUIDA" }
    }
    var dadosRetorno = await api.patch('http://localhost:8080/viagens/' + viagem.id + '/status', novoStatus);

    if (dadosRetorno.status == 200) {
        alert("Atualizado com sucesso!");

    } else {
        alert(dadosRetorno.data);

        return
    }
}

export async function ConsultaViagemPorId(id: number): Promise<Viagem> {
    const valorViagemBack = await api.get<Viagem>('http://localhost:8080/viagens/' + id);
    return valorViagemBack.data;
}

export async function atualizarViagem(viagem: Viagem): Promise<number>{
    var dadosRetorno = await api.put<number>('http://localhost:8080/viagens/'+viagem.id, viagem);
    return dadosRetorno.data;
}

export async function salvarViagem(viagem: Viagem): Promise<number>{
    var dadosRetorno = await api.post<number>('http://localhost:8080/viagens/', viagem);
    return dadosRetorno.data;
}