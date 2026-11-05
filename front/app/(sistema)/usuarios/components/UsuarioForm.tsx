"use client"

import { atualizarUsuario, salvarUsuario } from "@/app/services/usuarioService";
import { Usuario, UsuarioFormProps } from "@/app/types/usuario";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {

    const router = useRouter();

    const [usuario, setUsuario] = useState<Usuario>
        (usuarioExistente || new Usuario(null, "", "", "", "", "ATIVO"));

    const handlerChange = (campo: 'nome' | 'cpf' | 'email' | 'senha', valor: string) => {
        setUsuario(valorAnterior =>
            new Usuario(
                valorAnterior.id,
                campo === 'nome' ? valor : valorAnterior.nome,
                campo === 'cpf' ? valor : valorAnterior.cpf,
                campo === 'email' ? valor : valorAnterior.email,
                campo === 'senha' ? valor : valorAnterior.senha,
                valorAnterior.status,
            )
        )
    }

    const handlerSalvar = async (formData: FormData) => {

        if (usuarioExistente) {
            var dadosRetorno = await atualizarUsuario(usuario);
            if (dadosRetorno) {
                alert("Usuario foi salvo com sucesso!");
            } else {
                alert("Erro ao salvar o usuario!");
                return
            }

        } else {
            var dadosRetorno = await salvarUsuario(usuario);
            if (dadosRetorno) {
                alert("Usuário foi salvo com sucesso!");
            }else{
                alert("Erro ao salvar Usuário!");
                return;
            }
        }
        router.push("/usuarios");
    }


    return (
        <form action={handlerSalvar} className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Nome completo:
                    </label>
                    <input
                        name="nome"
                        value={usuario.nome}
                        required
                        onChange={(e) => handlerChange('nome', e.target.value)}
                        type="text"
                        placeholder="Digite o nome completo"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        CPF:
                    </label>
                    <input
                        name="cpf"
                        value={usuario.cpf}
                        onChange={(e) => handlerChange('cpf', e.target.value)}
                        type="text"
                        placeholder="000.000.000-00"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email:
                    </label>
                    <input
                        name="email"
                        value={usuario.email}
                        required
                        onChange={(e) => handlerChange('email', e.target.value)}
                        type="email"
                        placeholder="usuario@gmail.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Senha:
                    </label>
                    <input
                        name="senha"
                        value={usuario.senha}
                        required
                        onChange={(e) => handlerChange('senha', e.target.value)}
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-800">
                    <Link
                        href="/usuarios"
                        className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-medium text-sm transition-colors"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm transition-colors shadow-lg shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </form>
    );
}