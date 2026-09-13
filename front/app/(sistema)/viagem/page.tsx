"use client"
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
            alert("Erro ao carregar dados do servidor!")
        }


    }



    return (<div className="min-h-screen bg-gradient-to-r from-[#020617] to-[#0d2872] p-6 md:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Gestao de viagens
            </h1>
            <Link
                href="/viagem/novo"
                className="inline-flex items-center justify-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
                Cadastrar Viagem
            </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-800/60 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Codigo
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Origem
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Destino
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Horario Inicio
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Horario Fim
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Motorista
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Onibus
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                        {viagens.map((viagem) => (
                            <tr key={viagem.id} className="hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                    {viagem.id}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                    {viagem.origem}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                    {viagem.destino}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                    {viagem.horarioInicio}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                    {viagem.horarioFim}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                    {viagem.motoristaId}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                    {viagem.onibusId}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                    {viagem.status}
                                </td>
                            </tr>
                        ))}

                        {viagens.length === 0 &&
                            (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center font-medium text-slate-100 text-center">
                                        Nenhuma viagem encontrada.
                                    </td>
                                </tr>
                            )}

                    </tbody>
                </table>
            </div>
        </div>







    </div>)
}