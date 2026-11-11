"use client"

import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const estiloLink = "px-4 py-3 rounded-lg text-slate-300 font-medium hover:bg-slate-800 hover:text-orange-500 transition-all duration-200";

export default function Sidebar() {

    const [sidebarAberta, setSidebarAberta] = useState(true);

    const usuario = useSelector((state: RootState) => state.auth.usuario);

    // Só ADMIN (admin da empresa ou global) gerencia usuários
    const ehAdmin = usuario?.role === "ROLE_ADMIN";

    return (
        <aside className={`bg-slate-900 border-r border-slate-800 text-slate-300 min-h-screen px-6 pt-3 pb-6 shrink-0 flex flex-col transition-all duration-300 ${sidebarAberta ? "w-64" : "w-16"}`}>

            <button onClick={() => setSidebarAberta(!sidebarAberta)}
                className="text-slate-300 hover:text-orange-500 text-xl mb-6">☰</button>

            {sidebarAberta && (
                <nav className="flex flex-col space-y-2">
                    <Link href="/home" className={estiloLink}>Home</Link>
                    {ehAdmin && (
                        <Link href="/usuarios" className={estiloLink}>Usuários</Link>
                    )}
                    <Link href="/motorista" className={estiloLink}>Motoristas</Link>
                    <Link href="/veiculos" className={estiloLink}>Veículos</Link>
                    <Link href="/viagem" className={estiloLink}>Viagens</Link>
                </nav>
            )}
        </aside>
    );
}