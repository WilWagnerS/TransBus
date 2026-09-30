export default function Home() {


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight text-center">
                Bem-vindo ao <span className="text-orange-500">TransBus</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-400 text-center tracking-wide">
                Gestão inteligente para um transporte eficiente.
            </p>
        </div>
    );
}