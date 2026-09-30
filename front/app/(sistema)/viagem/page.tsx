"use client";

import { Viagem } from "@/app/types/viagem";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Viagens() {
    const [viagens, setViagens] = useState<Viagem[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const dados = await axios.get<Viagem[]>("http://localhost:8080/viagem");
            setViagens(dados.data);
        } catch (error) {
            alert("Erro ao carregar dados do servidor!");
        }
    };

    // Função para formatar a data feia da API de forma enxuta (ex: 31/08/2026 19:30)
    const formatarData = (dataString?: string) => {
        if (!dataString) return "-";
        const data = new Date(dataString);
        if (isNaN(data.getTime())) return dataString;
        return data.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleCancelarViagem = async (viagem: Viagem) => {
        var dadosRetorno = await axios.delete('http://localhost:8080/viagem/' + viagem.id + '/cancelar')

        if (dadosRetorno.status == 200) {
            alert("Viagem cancelada com sucesso!")
        } else {
            alert(dadosRetorno.data)
            return;
        }

        carregarDados()
    };

    const handleAlterarStatusViagem = async (viagem: Viagem) => {
        var novoStatus = {}

        if (viagem.status === "AGENDADA") {
            novoStatus = { statusViagem: "EM_ANDAMENTO" }
            await axios.patch('http://localhost:8080/motoristas/' + viagem.motorista?.id + '/status', { statusMotorista: "DIRIGINDO" })
            await axios.patch('http://localhost:8080/onibus/' + viagem.onibus?.id + '/status', { statusOnibus: "EM_SERVICO" });

        } else if (viagem.status === "EM_ANDAMENTO") {
            novoStatus = { statusViagem: "CONCLUIDA" }
            await axios.patch('http://localhost:8080/motoristas/' + viagem.motorista?.id + '/status', { statusMotorista: "EM_EXPEDIENTE" })
            await axios.patch('http://localhost:8080/onibus/' + viagem.onibus?.id + '/status', { statusOnibus: "GARAGEM" });
        } else {
            novoStatus = { statusViagem: "AGENDADA" }
        }

        //} else {
        //    alert("Esta viagem não pode ter o status alterado.");
        //    return;
        //}

        var dadosRetorno = await axios.patch('http://localhost:8080/viagem/' + viagem.id + '/status', novoStatus);

        if (dadosRetorno.status == 200) {
            alert("Atualizado com sucesso!")
        } else {
            alert(dadosRetorno.data)
            return;
        }

        carregarDados()
    };

    const handleReportarProblema = async (viagem: Viagem) => {

        var origemProblema = prompt("O problema foi no: (1) para Motorista, (2) para Onibus, (3) para Ambos");

        if (origemProblema !== "1" && origemProblema !== "2" && origemProblema !== "3") {
            alert("Opção inválida.");
            return;
        }

        await axios.patch('http://localhost:8080/viagem/' + viagem.id + '/status', { statusViagem: "COM_PROBLEMA" });

        if (origemProblema === "1" || origemProblema === "3") {
            await axios.patch('http://localhost:8080/motoristas/' + viagem.motorista?.id + '/status', { statusMotorista: "INDISPONIVEL" });
        }

        if (origemProblema === "2" || origemProblema === "3") {
            await axios.patch('http://localhost:8080/onibus/' + viagem.onibus?.id + '/status', { statusOnibus: "AVARIADO" });
        }

        alert("Problema reportado!");
        carregarDados();
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#020617] to-[#0d2872] p-4 sm:p-6 md:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Gestão de viagem
                </h1>
                <Link
                    href="/viagem/novo"
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                    Cadastrar Viagem
                </Link>
            </div>

            {/* Container responsivo da tabela */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead className="bg-slate-800/60 border-b border-slate-800">
                            <tr>
                                <th className="px-4 py-3.5 text-xs font-semibold text-slate-300 uppercase tracking-wider text-center whitespace-nowrap">
                                    Código
                                </th>
                                <th className="px-4 py-3.5 text-xs font-semibold text-slate-300 uppercase tracking-wider text-center whitespace-nowrap">
                                    Origem
                                </th>
                                <th className="px-4 py-3.5 text-xs font-semibold text-slate-300 uppercase tracking-wider text-center whitespace-nowrap">
                                    Destino
                                </th>
                                <th className="px-4 py-3.5 text-xs font-semibold text-slate-300 uppercase tracking-wider text-center whitespace-nowrap">
                                    Horário Início
                                </th>
                                <th className="px-4 py-3.5 text-xs font-semibold text-slate-300 uppercase tracking-wider text-center whitespace-nowrap">
                                    Horário Fim
                                </th>
                                <th className="px-4 py-3.5 text-xs font-semibold text-slate-300 uppercase tracking-wider text-center whitespace-nowrap">
                                    Motorista
                                </th>
                                <th className="px-4 py-3.5 text-xs font-semibold text-slate-300 uppercase tracking-wider text-center whitespace-nowrap">
                                    Ônibus
                                </th>
                                <th className="px-4 py-3.5 text-xs font-semibold text-slate-300 uppercase tracking-wider text-center whitespace-nowrap">
                                    Status
                                </th>
                                <th className="px-4 py-3.5 text-xs font-semibold text-slate-300 uppercase tracking-wider text-center whitespace-nowrap">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-200">
                            {viagens.map((viagem) => (
                                <tr key={viagem.id} className="hover:bg-slate-800/40 transition-colors">
                                    <td className="px-4 py-3 text-sm font-medium text-center text-slate-100 whitespace-nowrap">
                                        {viagem.id}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-center text-slate-100 whitespace-nowrap">
                                        {viagem.origem}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-center text-slate-100 whitespace-nowrap">
                                        {viagem.destino}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-center text-slate-100 whitespace-nowrap">
                                        {formatarData(viagem.horarioInicio)}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-center text-slate-100 whitespace-nowrap">
                                        {formatarData(viagem.horarioFim)}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-center text-slate-100 whitespace-nowrap">
                                        {viagem.motorista?.nome || "-"}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-center text-slate-100 whitespace-nowrap">
                                        {viagem.onibus?.placa || "-"}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-center text-slate-100 whitespace-nowrap">
                                        {viagem.status}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2 flex-nowrap">
                                            {/* Botão de editar */}
                                            <Link
                                                href={`/viagem/${viagem.id}/editar`}
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-orange-500 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/50 rounded-lg transition-all duration-200 shadow-sm group"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.8"
                                                    stroke="currentColor"
                                                    className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500 transition-colors"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                    />
                                                </svg>
                                                <span>Editar</span>
                                            </Link>

                                            {/* Botão de deletar */}
                                            {(viagem.status === "AGENDADA" || viagem.status === "EM_ANDAMENTO" || viagem.status === "COM_PROBLEMA") && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleCancelarViagem(viagem)}
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-orange-600 hover:text-orange-800 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/50 rounded-lg transition-all duration-200 shadow-sm group"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.8"
                                                        stroke="currentColor"
                                                        className="w-3.5 h-3.5 text-orange-600 group-hover:text-orange-800 transition-colors"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                    <span>Deletar</span>
                                                </button>
                                            )}

                                            {/* Botão de reportar problema */}
                                            {viagem.status === "EM_ANDAMENTO" && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleReportarProblema(viagem)}
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/50 rounded-lg transition-all duration-200 shadow-sm text-orange-600 hover:text-orange-800 group"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.8"
                                                        stroke="currentColor"
                                                        className="w-3.5 h-3.5 text-orange-600 group-hover:text-orange-800 transition-colors"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                                        />
                                                    </svg>
                                                    <span>Reportar problema</span>
                                                </button>
                                            )}

                                            {/* Botão de alterar status */}
                                            <button
                                                type="button"
                                                onClick={() => handleAlterarStatusViagem(viagem)}
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border rounded-lg transition-all duration-200 shadow-sm group ${viagem.status === 'COM_PROBLEMA'
                                                    ? 'font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 border-red-500 shadow-md shadow-red-900/30'
                                                    : `font-medium bg-slate-800/80 hover:bg-slate-800 ${viagem.status === 'CANCELADA' || viagem.status === 'EXCLUIDO'
                                                        ? 'text-orange-600 hover:text-orange-800 border-slate-700/60 hover:border-orange-500/50'
                                                        : viagem.status === 'AGENDADA'
                                                            ? 'text-yellow-500 hover:text-yellow-400 border-yellow-500/40 hover:border-yellow-500/60'
                                                            : viagem.status === 'EM_ANDAMENTO'
                                                                ? 'text-purple-500 hover:text-purple-400 border-purple-500/40 hover:border-purple-500/60'
                                                                : 'text-green-500 hover:text-green-400 border-green-500/40 hover:border-green-500/60'
                                                    }`
                                                    }`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.8"
                                                    stroke="currentColor"
                                                    className={`w-3.5 h-3.5 transition-colors 
                                                        ${viagem.status === 'CANCELADA' || viagem.status === 'EXCLUIDO'
                                                            ? 'text-orange-600 group-hover:text-orange-800'
                                                            : viagem.status === 'COM_PROBLEMA'
                                                                ? 'text-white'
                                                                : viagem.status === 'AGENDADA'
                                                                    ? 'text-yellow-500 group-hover:text-yellow-400'
                                                                    : viagem.status === 'EM_ANDAMENTO'
                                                                        ? 'text-purple-500 group-hover:text-purple-400'
                                                                        : 'text-green-500 group-hover:text-green-400'
                                                        }`}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                                    />
                                                </svg>
                                                <span>{viagem.status}</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {viagens.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="px-6 py-12 text-center font-medium text-slate-300">
                                        Nenhuma viagem encontrada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}