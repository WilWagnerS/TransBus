"use client"

import Link from "next/link";

export default function MotoristaForm() {
    return (
        <form className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="space-y-6">
                {/* Nome Completo */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Nome completo:
                    </label>
                    <input
                        name="nome"
                        type="text"
                        placeholder="Digite o nome completo"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>

                {/* CNH */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        CNH:
                    </label>
                    <input
                        name="cnh"
                        type="text"
                        placeholder="00000000000"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>

                {/* Telefone */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Telefone:
                    </label>
                    <input
                        name="telefone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-800">
                    <Link
                        href="/motorista"
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