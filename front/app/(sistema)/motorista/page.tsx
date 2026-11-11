"use client"

import { atualizarStatusMotorista, buscarListaMotoristas, excluirMotorista } from "@/app/services/motoristaService";
import { mensagemDeErro } from "@/app/services/api";
import { Motorista } from "@/app/types/motorista";
import Link from "next/link";
import { useEffect, useState } from "react";

const STATUS_MOTORISTA = ["EM_EXPEDIENTE", "DIRIGINDO", "INTERVALO", "FORA_DE_SERVICO", "INDISPONIVEL"];

function corStatus(status: string) {
    switch (status) {
        case "EM_EXPEDIENTE": return "text-green-400 border-green-500/50";
        case "DIRIGINDO": return "text-purple-400 border-purple-500/50";
        case "INTERVALO": return "text-sky-400 border-sky-500/50";
        case "INDISPONIVEL": return "text-red-400 border-red-500/60";
        default: return "text-slate-400 border-slate-700";
    }
}

export default function Motoristas() {
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const dados = await buscarListaMotoristas();
            setMotoristas(dados);
        } catch (error) {
            const msg = mensagemDeErro(error, "Erro ao carregar dados do servidor!");
            if (msg) alert(msg);
        } finally {
            setCarregando(false);
        }
    }

    const handleAlterarStatus = async (motorista: Motorista, novoStatus: string) => {
        try {
            await atualizarStatusMotorista(motorista.id || 0, novoStatus);
            carregarDados();
        } catch (error) {
            const msg = mensagemDeErro(error, "Erro ao alterar o status do motorista!");
            if (msg) alert(msg);
        }
    }

    const handleExcluir = async (motorista: Motorista) => {
        if (!confirm("Deseja excluir o motorista " + motorista.nome + "?")) {
            return;
        }
        try {
            await excluirMotorista(motorista.id || 0);
            carregarDados();
        } catch (error) {
            const msg = mensagemDeErro(error, "Erro ao excluir o motorista!");
            if (msg) alert(msg);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#020617] to-[#0d2872] p-6 md:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Gestão de motoristas
                </h1>
                <Link
                    href="/motorista/novo"
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-200"
                >
                    Cadastrar Motorista
                </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-800/60 border-b border-slate-800">
                            <tr>
                                {["Código", "Nome", "CNH", "Telefone", "Cidade", "Status", "Ações"].map((titulo) => (
                                    <th key={titulo} className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase text-center tracking-wider">
                                        {titulo}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-200">
                            {motoristas.map((motorista) => (
                                <tr key={motorista.id} className="hover:bg-slate-800/40 transition-colors">
                                    <td className="px-6 py-4 text-sm text-center">{motorista.id}</td>
                                    <td className="px-6 py-4 text-sm text-center font-medium">{motorista.nome}</td>
                                    <td className="px-6 py-4 text-sm text-center">{motorista.cnh}</td>
                                    <td className="px-6 py-4 text-sm text-center">{motorista.telefone}</td>
                                    <td className="px-6 py-4 text-sm text-center">
                                        {motorista.endereco ? `${motorista.endereco.cidade}/${motorista.endereco.uf}` : "—"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center">
                                        {motorista.status === "EXCLUIDO" ? (
                                            <span className="text-slate-500">EXCLUIDO</span>
                                        ) : (
                                            <select
                                                value={motorista.status}
                                                onChange={(e) => handleAlterarStatus(motorista, e.target.value)}
                                                className={`bg-slate-950 border rounded-lg px-2 py-1.5 text-xs font-medium focus:outline-none ${corStatus(motorista.status)}`}
                                            >
                                                {STATUS_MOTORISTA.map((s) => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                href={`/motorista/${motorista.id}/editar`}
                                                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-orange-500 bg-slate-800/80 border border-slate-700/60 hover:border-orange-500/50 rounded-lg transition-all"
                                            >
                                                Editar
                                            </Link>
                                            {motorista.status !== "EXCLUIDO" && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleExcluir(motorista)}
                                                    className="px-3 py-1.5 text-xs font-medium text-orange-600 hover:text-orange-400 bg-slate-800/80 border border-slate-700/60 hover:border-orange-500/50 rounded-lg transition-all"
                                                >
                                                    Excluir
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!carregando && motoristas.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center font-medium text-slate-100">
                                        Nenhum motorista encontrado.
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