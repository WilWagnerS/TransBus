"use client"

import { AppDispatch, RootState } from "@/app/redux/store";
import { carregarVeiculos, setFiltroStatus } from "@/app/redux/slice/veiculoSlice";
import { atualizarStatusVeiculo, excluirVeiculo } from "@/app/services/veiculoService";
import { mensagemDeErro } from "@/app/services/api";
import { Veiculo } from "@/app/types/veiculo";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const STATUS_VEICULO = ["GARAGEM", "EM_SERVICO", "AVARIADO", "EM_MANUTENCAO"];

function corStatus(status: string) {
    switch (status) {
        case "GARAGEM": return "text-green-400 border-green-500/50";
        case "EM_SERVICO": return "text-purple-400 border-purple-500/50";
        case "AVARIADO": return "text-red-400 border-red-500/60";
        case "EM_MANUTENCAO": return "text-yellow-400 border-yellow-500/50";
        default: return "text-slate-400 border-slate-700";
    }
}

export default function Veiculos() {

    const dispatch = useDispatch<AppDispatch>();

    // Lista, filtro e carregando vêm da STORE do Redux
    const { lista, filtroStatus, carregando } = useSelector((state: RootState) => state.veiculos);

    useEffect(() => {
        dispatch(carregarVeiculos());
    }, [dispatch]);

    const veiculosFiltrados = filtroStatus === "TODOS"
        ? lista
        : lista.filter((v) => v.status === filtroStatus);

    const handleAlterarStatus = async (veiculo: Veiculo, novoStatus: string) => {
        if (novoStatus === "AVARIADO" &&
            !confirm("Marcar como AVARIADO vai desvincular as próximas viagens deste veículo. Continuar?")) {
            return;
        }
        try {
            await atualizarStatusVeiculo(veiculo.id || 0, novoStatus);
            dispatch(carregarVeiculos());
        } catch (error) {
            const msg = mensagemDeErro(error, "Erro ao alterar o status do veículo!");
            if (msg) alert(msg);
        }
    }

    const handleExcluir = async (veiculo: Veiculo) => {
        if (!confirm("Deseja excluir o veículo " + veiculo.placa + "?")) {
            return;
        }
        try {
            await excluirVeiculo(veiculo.id || 0);
            dispatch(carregarVeiculos());
        } catch (error) {
            const msg = mensagemDeErro(error, "Erro ao excluir o veículo!");
            if (msg) alert(msg);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#020617] to-[#0d2872] p-6 md:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Gestão de veículos
                </h1>
                <div className="flex items-center gap-3">
                    {/* Filtro guardado na store do Redux */}
                    <select
                        value={filtroStatus}
                        onChange={(e) => dispatch(setFiltroStatus(e.target.value))}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                    >
                        <option value="TODOS">Todos os status</option>
                        {STATUS_VEICULO.map((s) => <option key={s} value={s}>{s}</option>)}
                        <option value="EXCLUIDO">EXCLUIDO</option>
                    </select>
                    <Link
                        href="/veiculos/novo"
                        className="inline-flex items-center justify-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-200"
                    >
                        Cadastrar Veículo
                    </Link>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-800/60 border-b border-slate-800">
                            <tr>
                                {["Código", "Tipo", "Placa", "Modelo", "Capacidade", "Status", "Ações"].map((titulo) => (
                                    <th key={titulo} className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase text-center tracking-wider">
                                        {titulo}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-200">
                            {veiculosFiltrados.map((veiculo) => (
                                <tr key={veiculo.id} className="hover:bg-slate-800/40 transition-colors">
                                    <td className="px-6 py-4 text-sm text-center">{veiculo.id}</td>
                                    <td className="px-6 py-4 text-sm text-center">
                                        {veiculo.tipo === "CAMINHAO" ? "🚚 Caminhão" : "🚌 Ônibus"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center font-medium">{veiculo.placa}</td>
                                    <td className="px-6 py-4 text-sm text-center">{veiculo.modelo}</td>
                                    <td className="px-6 py-4 text-sm text-center">{veiculo.capacidade}</td>
                                    <td className="px-6 py-4 text-sm text-center">
                                        {veiculo.status === "EXCLUIDO" ? (
                                            <span className="text-slate-500">EXCLUIDO</span>
                                        ) : (
                                            <select
                                                value={veiculo.status}
                                                onChange={(e) => handleAlterarStatus(veiculo, e.target.value)}
                                                className={`bg-slate-950 border rounded-lg px-2 py-1.5 text-xs font-medium focus:outline-none ${corStatus(veiculo.status)}`}
                                            >
                                                {STATUS_VEICULO.map((s) => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                href={`/veiculos/${veiculo.id}/editar`}
                                                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-orange-500 bg-slate-800/80 border border-slate-700/60 hover:border-orange-500/50 rounded-lg transition-all"
                                            >
                                                Editar
                                            </Link>
                                            {veiculo.status !== "EXCLUIDO" && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleExcluir(veiculo)}
                                                    className="px-3 py-1.5 text-xs font-medium text-orange-600 hover:text-orange-400 bg-slate-800/80 border border-slate-700/60 hover:border-orange-500/50 rounded-lg transition-all"
                                                >
                                                    Excluir
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!carregando && veiculosFiltrados.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center font-medium text-slate-100">
                                        Nenhum veículo encontrado.
                                    </td>
                                </tr>
                            )}
                            {carregando && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                                        Carregando...
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