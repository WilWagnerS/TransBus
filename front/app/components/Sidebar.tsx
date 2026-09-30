"use client"

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {

    const [sidebarAberta, setSidebarAberta] = useState(true);

    return (
        <aside className={`bg-slate-900 border-r border-slate-800 text-slate-300 min-h-screen px-6 pt-3 pb-6 shrink-0 flex flex-col transition-all duration-300 ${sidebarAberta ? "w-64" : "w-16"}`}>
          
            <button onClick={() => setSidebarAberta(!sidebarAberta)}
                className="text-slate-300 hover:text-orange-500 text-xl mb-6">☰</button>

            {sidebarAberta && (
                <nav className="flex flex-col space-y-2">
                    <Link
                        href="/home"
                        className="px-4 py-3 rounded-lg text-slate-300 font-medium hover:bg-slate-800 hover:text-orange-500 transition-all duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        href="/usuarios"
                        className="px-4 py-3 rounded-lg text-slate-300 font-medium hover:bg-slate-800 hover:text-orange-500 transition-all duration-200"
                    >
                        Usuarios
                    </Link>
                    <Link
                        href="/motorista"
                        className="px-4 py-3 rounded-lg text-slate-300 font-medium hover:bg-slate-800 hover:text-orange-500 transition-all duration-200"
                    >
                        Motoristas
                    </Link>
                    <Link
                        href="/onibus"
                        className="px-4 py-3 rounded-lg text-slate-300 font-medium hover:bg-slate-800 hover:text-orange-500 transition-all duration-200"
                    >
                        Onibus
                    </Link>
                    <Link
                        href="/viagem"
                        className="px-4 py-3 rounded-lg text-slate-300 font-medium hover:bg-slate-800 hover:text-orange-500 transition-all duration-200"
                    >
                        Viagem
                    </Link>
                </nav>
            )}
        </aside>
    );
}
