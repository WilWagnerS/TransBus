"use client"

import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Importado o hook useRouter do Next.js

export default function Header() {

    // 2. Instanciado o roteador para permitir o redirecionamento
    const router = useRouter();

    // 3. Criada a função que limpa a sessão e redireciona para o login
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove o token de autenticação, se houver
        router.push("/login"); // Redireciona para a raiz (página de login)
    };

    return (
        <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40 px-6 py-4">
            {/* Removido max-w-7xl e mx-auto para expandir de ponta a ponta */}
            <div className="w-full flex items-center justify-between">

                {/* Logo TransBus com Link para Home */}
                <Link href="/home" className="flex items-center shrink-0">
                    <img
                        src="/transbus-logo.svg"
                        alt="TransBus Logo"
                        className="h-10 w-auto object-contain"
                    />
                </Link>

                {/* Perfil do Usuário e Botão Sair */}
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-orange-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 stroke-current fill-none stroke-2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                        <span className="text-slate-800 font-medium text-sm md:text-base">
                            Wagner dos Santos
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout} // 4. Adicionado o evento onClick chamando a função criada
                        className="px-4 py-2 bg-slate-100 hover:bg-orange-500 text-slate-700 hover:text-white font-medium text-sm rounded-lg border border-slate-300 hover:border-orange-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white"
                    >
                        Sair
                    </button>
                </div>

            </div>
        </header>
    );
}