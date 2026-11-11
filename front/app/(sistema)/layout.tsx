'use client'

import { RootState } from "../redux/store";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function SistemaLayout({ children }: { children: React.ReactNode }) {

    // Token vem SOMENTE da store do Redux
    const token = useSelector((state: RootState) => state.auth.token);

    const router = useRouter();

    // Sem token (não logou, fez logout ou o interceptor recebeu 401) -> tela de login
    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    // Enquanto redireciona, não desenha o sistema
    if (!token) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
            <Header />
            <div className="flex min-h-[calc(100vh-73px)]">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <main className="flex-1 w-full">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}