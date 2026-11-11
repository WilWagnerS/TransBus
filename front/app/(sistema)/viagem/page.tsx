"use client";

import { atualizarStatusViagem, buscarListaViagens, cancelarViagem } from "@/app/services/viagemService";
import { mensagemDeErro } from "@/app/services/api";
import { Viagem } from "@/app/types/viagem";
import Link from "next/link";
import { useEffect, useState } from "react";

function formatarData(data: string) {
    if (!data) return "—";
    return new Date(data).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function corStatus(status: string) {
    switch (status) {
        case "AGENDADA": return "text-sky-400 border-sky-500/50";
        case "EM_ANDAMENTO": return "text-purple-400 border-purple-500/50";
        case "CONCLUIDA": return "text-green-400 border-green-500/50";
        case "COM_PROBLEMA": return "text-red-400 border-red-500/60";
        default: return "text-slate-400 border-slate-700";
    }
}

const estiloBotao = "px-3 py-1.5 text-xs font-medium bg-slate-800/80 border rounded-lg transition-all whitespace-nowrap";

export default function Viagens() {
    const [viagens, setViagens] = useState<Viagem[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const dados = await buscarListaViagens();
            setViagens(dados);
        } catch (error) {
            const msg = mensagemDeErro(error, "Erro ao carregar dados do servidor!");
            if (msg) alert(msg);
        } finally {
            setCarregando(false);
        }
    };

    const handleAlterarStatus = async (viagem: Viagem, novoStatus: string) => {
        try {
            await atualizarStatusViagem(viagem.id || 0, novoStatus);
            carregarDados();
        } catch (error) {
            // Ex.: "Viagem sem veículo! Vincule um veículo antes de iniciar."
            const msg = mensagemDeErro(error, "Erro ao alterar o status da viagem!");
            if (msg) alert(msg);
        }
    }

    const handleCancelar = async (viagem: Viagem) => {
        if (!confirm(`Cancelar a viagem ${viagem.origem} → ${viagem.destino}?`)) {
            return;
        }
        try {
            await cancelarViagem(viagem.id || 0);
            carregarDados();
        } catch (error) {
            const msg = mensagemDeErro(error, "Erro ao cancelar a viagem!");
            if (msg) alert(msg);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#020617] to-[#0d2872] p-4 sm:p-6 md:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Gestão de viagens
                </h1>
                <Link
                    href="/viagem/novo"
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-200"
                >
                    Cadastrar Viagem
                </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead className="bg-slate-800/60 border-b border-slate-800">
                            <tr>
                                {["Código", "Rota", "Início", "Fim", "Motorista", "Veículo", "Status", "Ações"].map((titulo) => (
                                    <th key={titulo} className="px-4 py-3.5 text-xs font-semibold text-slate-300 uppercase tracking-wider text-center whitespace-nowrap">
                                        {titulo}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-200">
                            {viagens.map((viagem) => (
                                <tr key={viagem.id} className="hover:bg-slate-800/40 transition-colors">
                                    <td className="px-4 py-4 text-sm text-center">{viagem.id}</td>
                                    <td className="px-4 py-4 text-sm text-center font-medium">
                                        {viagem.origem} → {viagem.destino}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-center whitespace-nowrap">{formatarData(viagem.horarioInicio)}</td>
                                    <td className="px-4 py-4 text-sm text-center whitespace-nowrap">{formatarData(viagem.horarioFim)}</td>
                                    <td className="px-4 py-4 text-sm text-center">{viagem.motoristaNome ?? "—"}</td>
                                    <td className="px-4 py-4 text-sm text-center">
                                        {viagem.veiculoPlaca ?? (
                                            // DIFERENCIAL: viagem desvinculada por veículo avariado
                                            <span className="inline-block px-2 py-1 rounded-md text-xs font-semibold text-red-300 bg-red-500/10 border border-red-500/40 whitespace-nowrap">
                                                ⚠️ Aguardando veículo
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-center">
                                        <span className={`inline-block px-2 py-1 rounded-md border text-xs font-medium ${corStatus(viagem.status)}`}>
                                            {viagem.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm">
                                        <div className="flex items-center justify-center gap-2">
                                            {viagem.status === "AGENDADA" && (
                                                <>
                                                    <Link href={`/viagem/${viagem.id}/editar`}
                                                        className={`${estiloBotao} text-slate-300 hover:text-orange-500 border-slate-700/60 hover:border-orange-500/50`}>
                                                        Editar
                                                    </Link>
                                                    <button type="button" onClick={() => handleAlterarStatus(viagem, "EM_ANDAMENTO")}
                                                        className={`${estiloBotao} text-purple-400 border-purple-500/50 hover:text-purple-300`}>
                                                        Iniciar
                                                    </button>
                                                </>
                                            )}
                                            {(viagem.status === "EM_ANDAMENTO" || viagem.status === "COM_PROBLEMA") && (
                                                <button type="button" onClick={() => handleAlterarStatus(viagem, "CONCLUIDA")}
                                                    className={`${estiloBotao} text-green-400 border-green-500/50 hover:text-green-300`}>
                                                    Concluir
                                                </button>
                                            )}
                                            {viagem.status === "EM_ANDAMENTO" && (
                                                <button type="button" onClick={() => handleAlterarStatus(viagem, "COM_PROBLEMA")}
                                                    className={`${estiloBotao} text-red-400 border-red-500/50 hover:text-red-300`}>
                                                    Reportar problema
                                                </button>
                                            )}
                                            {(viagem.status === "AGENDADA" || viagem.status === "EM_ANDAMENTO" || viagem.status === "COM_PROBLEMA") && (
                                                <button type="button" onClick={() => handleCancelar(viagem)}
                                                    className={`${estiloBotao} text-orange-600 border-slate-700/60 hover:text-orange-400 hover:border-orange-500/50`}>
                                                    Cancelar
                                                </button>
                                            )}
                                            {(viagem.status === "CONCLUIDA" || viagem.status === "CANCELADA") && (
                                                <span className="text-xs text-slate-500">—</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!carregando && viagens.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center font-medium text-slate-100">
                                        Nenhuma viagem encontrada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}