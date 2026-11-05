import { Onibus } from "../types/onibus";
import api from "./api";

export async function buscarListaOnibus(): Promise<Onibus[]> {

    const dados = await api.get<Onibus[]>("http://localhost:8080/onibus/");

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

export async function deletarOnibus(id: number): Promise<number> {

    var dados = await api.delete('http://localhost:8080/onibus/' + id + '/excluir');
    return dados.status;
}

export async function atualizarStatusOnibus(onibus: Onibus): Promise<void> {

    var novoStatus = {};
    if (onibus.status === "GARAGEM") {
        novoStatus = { statusOnibus: "EM_SERVICO" }
    } else {
        novoStatus = { statusOnibus: "AVARIADO" }
    }
    var dadosRetorno = await api.patch('http://localhost:8080/onibus/' + onibus.id + '/status', novoStatus);

    if (dadosRetorno.status == 200) {
        alert("Atualizado com sucesso!");

    } else {
        alert(dadosRetorno.data);

        return
    }
}

export async function ConsultaOnibusPorId(id: number): Promise<Onibus> {
    const valorOnibusBack = await api.get<Onibus>('http://localhost:8080/onibus/' + id);
    return valorOnibusBack.data;
}

export async function atualizarOnibus(onibus: Onibus): Promise<number>{
    var dadosRetorno = await api.put<number>('http://localhost:8080/onibus/'+onibus.id, onibus);
    return dadosRetorno.data;
}

export async function salvarOnibus(onibus: Onibus): Promise<number>{
    var dadosRetorno = await api.post<number>('http://localhost:8080/onibus/', onibus);
    return dadosRetorno.data;
}