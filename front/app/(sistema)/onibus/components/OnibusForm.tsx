"use client"

import Link from "next/link";

export default function OnibusForm() {
    return (
        <form className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="space-y-6">
                {/* Placa */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Placa:
                    </label>
                    <input
                        name="placa"
                        type="text"
                        placeholder="ABC-1234 ou ABC1D23"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>

                {/* Modelo */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Modelo:
                    </label>
                    <input
                        name="modelo"
                        type="text"
                        placeholder="Ex: Marcopolo Paradiso 1800 DD"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>

                {/* Capacidade */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Capacidade (passageiros):
                    </label>
                    <input
                        name="capacidade"
                        type="number"
                        placeholder="Ex: 44"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-800">
                    <Link
                        href="/onibus"
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