"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import ViagemForm from "../../components/ViagemForm";

export default function EditarViagem() {
    const parametro = useParams();
    const codigo = Number(parametro.codigo);

    return (
        <div className="w-full min-h-screen p-6 md:p-10 space-y-6">
            <div>
                <Link
                    href="/viagem"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-orange-500 border border-slate-700/60 hover:border-orange-500/50 shadow-sm transition-all duration-200 group w-fit"
                >
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-700/50 group-hover:bg-orange-500/20 text-slate-400 group-hover:text-orange-500 transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="w-3 h-3 transition-transform group-hover:-translate-x-0.5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                    <span>Voltar para Listagem</span>
                </Link>
            </div>

            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Viagem cadastrada {codigo}
                </h1>
                <p className="text-slate-400 text-sm md:text-base mt-1">
                    Edite os dados da viagem
                </p>
            </div>

            <div className="max-w-2xl mx-auto">
                <ViagemForm />
            </div>
        </div>
    );
}