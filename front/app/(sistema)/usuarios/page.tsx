"use client"

import { Usuario } from "@/app/types/usuario";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const dados = await axios.get<Usuario[]>("http://localhost:8080/usuarios");
            setUsuarios(dados.data);
        } catch (error) {
            alert("Erro ao carregar dados do servidor!");
        }
    }

    const handleDeletarUsuario = async (usuario: Usuario) => {

        var dadosRetorno = await axios.delete('http://localhost:8080/usuarios/' + usuario.id + '/excluir');

        if (dadosRetorno.status == 200) {
            alert("Excluido com sucesso!");

        } else {
            alert(dadosRetorno.data);

            return;
        }

        carregarDados();

    }

    const handleAlterarStatusUsuario = async (usuario: Usuario) => {

        var novoStatus = {};
        if (usuario.status === "ATIVO") {
            novoStatus = { statusUsuario: "BLOQUEADO" }
        } else {
            novoStatus = { statusUsuario: "ATIVO" }
        }
        var dadosRetorno = await axios.patch('http://localhost:8080/usuarios/' + usuario.id + '/status', novoStatus);

        if (dadosRetorno.status == 200) {
            alert("Atualizado com sucesso!");

        } else {
            alert(dadosRetorno.data);

            return
        }

        carregarDados();

    }

    const formatarCPF = (cpf: string) => {
        return cpf
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-[#020617] to-[#0d2872] p-6 md:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Gestao de usuarios
                </h1>
                <Link
                    href="/usuarios/novo"
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                    Cadastrar usuário
                </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-800/60 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase text-center tracking-wider">
                                    Codigo
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase text-center tracking-wider">
                                    Nome
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase text-center tracking-wider">
                                    CPF
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase text-center tracking-wider">
                                    E-mail
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase text-center tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-300 uppercase text-center tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-200">
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id} className="hover:bg-slate-800/40 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-center text-slate-100">
                                        {usuario.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-center text-slate-100">
                                        {usuario.nome}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-center text-slate-100">
                                        {formatarCPF(usuario.cpf)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-center text-slate-100">
                                        {usuario.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-center text-slate-100">
                                        {usuario.status}
                                    </td>
                                    {/* Botão de editar estilizado. */}
                                    <td className="px-6 py-4 text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/usuarios/${usuario.id}/editar`}
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
                                            {/* Botão de deletar estilizado. */}
                                            {(usuario.status !== "EXCLUIDO") && (
                                            <button
                                                type="button"
                                                onClick={() => handleDeletarUsuario(usuario)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-orange-600 hover:text-orange-800 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/50 rounded-lg transition-all duration-200 shadow-sm group"
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

                                            {/* Botão de alterar status estilizado com cores dinâmicas. */}
                                            <button
                                                type="button"
                                                onClick={() => handleAlterarStatusUsuario(usuario)}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-all duration-200 shadow-sm group ${usuario.status === 'BLOQUEADO'
                                                    ? 'text-orange-500 hover:text-orange-400 hover:border-orange-500/50'
                                                    : 'text-green-500 hover:text-green-400 hover:border-green-500/50'
                                                    }`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.8"
                                                    stroke="currentColor"
                                                    className={`w-3.5 h-3.5 transition-colors ${usuario.status === 'BLOQUEADO'
                                                        ? 'text-orange-500 group-hover:text-orange-400'
                                                        : 'text-green-500 group-hover:text-green-400'
                                                        }`}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                                    />
                                                </svg>
                                                <span>{usuario.status}</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {usuarios.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center font-medium text-slate-400">
                                        Nenhum usuário encontrado.
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
