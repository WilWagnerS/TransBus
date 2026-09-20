import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


export default function SistemaLayout({ children }) {
    return (

        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
            <Header />

            <div className="flex min-h-[calc(100vh-73px)]">
                <Sidebar />

                <div className="flex-1 flex flex-col min-w-0">
                    <main className="flex-1 w-full">
                        {children}
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}