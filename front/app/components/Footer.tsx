export default function Footer() {

    const anoAtual = new Date().getFullYear();
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-6 px-4 mt-auto">
            <div className="max-w-7xl mx-auto flex justify-center items-center">
                <div className="text-center">
                    <p className="text-slate-400 text-sm font-medium flex items-center justify-center gap-1.5">
                        &copy; {anoAtual}
                        <span className="text-orange-500 font-bold">
                            TransBus
                        </span>
                        Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}