"use client"

import { Motorista } from "@/app/types/motorista";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function Motoristas() {

    const [motoristas, setMotoristas] = useState<Motorista[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {

        try {

            const dados = await axios.get<Motorista[]>("http://localhost:8080/motoristas");


            setMotoristas(dados.data);

        } catch (error) {
            alert("Erro ao carregar dados do servidor!")
        }


    }





    return (

        <div className="min-h-screen bg-gradient-to-r from-[#020617] to-[#0d2872] p-6 md:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Gestao de motoristas
                </h1>
                <Link
                    href="/motorista/novo"
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                    Cadastrar Motorista
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
                                    Nome
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    CNH
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Telefone
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider text-right">
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-200">

                            {motoristas.map((motorista) => (
                                <tr key={motorista.id} className="hover:bg-slate-800/40 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                        {motorista.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                        {motorista.nome}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                        {motorista.cnh}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                        {motorista.telefone}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-100">
                                        {motorista.status}
                                    </td>
                                    {/* Botão de editar estilizado. */}
                                    <td className="px-6 py-4 text-sm font-medium text-right">
                                        <Link
                                            href={`/motorista/${motorista.id}/editar`}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-orange-500 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/50 rounded-lg transition-all duration-200 shadow-sm group"
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
                                    </td>
                                </tr>
                            ))}

                            {motoristas.length === 0 &&
                                (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center font-medium text-slate-100 text-center">
                                            Nenhum motorista encontrado.
                                        </td>
                                    </tr>
                                )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}