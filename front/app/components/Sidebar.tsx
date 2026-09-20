import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="bg-slate-900 border-r border-slate-800 text-slate-300 w-64 min-h-screen px-6 pt-3 pb-6 shrink-0 flex flex-col">
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
        </aside>
    );
}