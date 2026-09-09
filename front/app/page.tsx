import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* INJEÇÃO DO CSS NO PRÓPRIO ARQUIVO */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* =========================================
           VARIÁVEIS DE COR E ESTILO BASE
           ========================================= */
        :root {
          /* Paleta Azul Marinho (Baseado no Tailwind Slate) */
          --cor-slate-950: #020617; /* Fundo escuro intenso (Rodapé e Hero) */
          --cor-slate-900: #0f172a; /* Títulos e textos fortes */
          --cor-slate-800: #1e293b; /* Elementos secundários escuros */
          --cor-slate-700: #334155; /* Textos de parágrafos */
          
          /* Tons Claros para Fundo */
          --cor-slate-50: #f8fafc;
          --cor-slate-100: #f1f5f9;

          /* Destaques Vibrantes */
          --cor-laranja: #f97316;       /* orange-500 */
          --cor-laranja-hover: #ea580c; /* orange-600 */

          --cor-branco: #ffffff;
          
          --fonte-principal: 'Bebas', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: var(--fonte-principal);
          background-color: var(--cor-slate-50);
          color: var(--cor-slate-700);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* =========================================
           CABEÇALHO E NAVEGAÇÃO
           ========================================= */
        header {
          background-color: var(--cor-branco);
          box-shadow: 0 2px 10px rgba(2, 6, 23, 0.08); /* Sombra suave baseada no slate */
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
        }

        .logo {
          font-size: 30px;
          font-weight: 800;
          color: var(--cor-slate-950);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 1px;
        }

        .logo span {
          color: var(--cor-laranja);
        }

        .btn-login {
          background-color: var(--cor-laranja);
          color: var(--cor-branco);
          padding: 10px 24px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .btn-login:hover {
          background-color: var(--cor-laranja-hover);
        }

        /* =========================================
           HERO SECTION (Destaque Principal)
           ========================================= */
        .hero {
          /* Gradiente moderno usando os tons slate mais escuros */
          background: linear-gradient(135deg, var(--cor-slate-950) 0%, var(--cor-slate-900) 100%);
          color: var(--cor-branco);
          padding: 100px 0;
          text-align: center;
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 24px;
          color: var(--cor-branco);
        }

        .hero h1 span {
          color: var(--cor-laranja);
        }

        .hero p {
          font-size: 1.25rem;
          max-width: 800px;
          margin: 0 auto 40px auto;
          color: var(--cor-slate-100);
        }

        /* =========================================
           SEÇÃO: NOSSA HISTÓRIA
           ========================================= */
        .historia {
          padding: 80px 0;
          background-color: var(--cor-branco);
        }

        .historia-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        @media(min-width: 768px) {
          .historia-grid {
              grid-template-columns: 1fr 1fr;
          }
        }

        .section-title {
          font-size: 2rem;
          margin-bottom: 24px;
          color: var(--cor-slate-900);
          position: relative;
          padding-bottom: 10px;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 4px;
          background-color: var(--cor-laranja); /* Detalhe laranja nos títulos */
          border-radius: 2px;
        }

        .historia-texto p {
          margin-bottom: 16px;
          font-size: 1.1rem;
          color: var(--cor-slate-700);
        }

        /* =========================================
           SEÇÃO: NOSSOS VALORES
           ========================================= */
        .valores {
          padding: 80px 0;
          background-color: var(--cor-slate-50);
        }

        .valores-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        .card-valor {
          background-color: var(--cor-branco);
          padding: 32px 24px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(2, 6, 23, 0.05);
          border-bottom: 4px solid var(--cor-laranja);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-valor:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(2, 6, 23, 0.1);
        }

        .card-valor h3 {
          color: var(--cor-slate-800);
          font-size: 1.25rem;
          margin-bottom: 8px;
        }

        /* =========================================
           RODAPÉ
           ========================================= */
        footer {
          background-color: var(--cor-slate-950);
          color: var(--cor-branco);
          text-align: center;
          padding: 40px 0;
        }

        footer p {
          opacity: 0.7;
          font-size: 0.9rem;
          color: var(--cor-slate-100);
        }
      `}} />

      {/* CABEÇALHO */}
      <header>
        <div className="container header-content">
          <Link href="/" className="logo">
            Trans<span>Bus</span>
          </Link>
          <Link href="/login" className="btn-login">Login</Link>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main>
        
        {/* HERO SECTION */}
        <section className="hero">
          <div className="container">
            <h1>Mais controle para sua <span>Frota de Ônibus</span></h1>
            <p>Centralize informações, gerencie e otimize em uma única plataforma confiável e segura.</p>
          </div>
        </section>

        {/* SEÇÃO NOSSA HISTÓRIA E OBJETIVO */}
        <section className="historia">
          <div className="container historia-grid">
            <div className="historia-texto">
              <h2 className="section-title">Quem Somos</h2>
              <p>O TransBus é um sistema criado para tornar a gestão de frotas de ônibus mais organizada e eficiente. A plataforma centraliza informações sobre veículos, motoristas e viagens, facilitando o controle da operação e contribuindo para um transporte de passageiros mais eficiente.</p>
              <p>Nosso objetivo é oferecer uma solução que simplifique a rotina de gestão, facilite a tomada de decisões e contribua para um transporte de passageiros mais eficiente.</p>
            </div>
            <div className="historia-texto">
              <h2 className="section-title">Nossa Missão</h2>
              <p>A principal motivação do sistema é centralizar essas informações em uma única plataforma, facilitando o gerenciamento da frota e auxiliando na organização das operações.</p>
              <p>No futuro, buscamos evoluir para uma solução cada vez mais completa. O objetivo final é entregar ao cliente mais controle sobre ônibus, motoristas e viagens, contribuindo para melhores decisões e uma operação mais qualificada.</p>
            </div>
          </div>
        </section>

        {/* SEÇÃO VALORES */}
        <section className="valores">
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center', display: 'table', margin: '0 auto' }}>
              Nossos Valores
            </h2>
            <div className="valores-grid">
              <div className="card-valor">
                <h3>Organização</h3>
              </div>
              <div className="card-valor">
                <h3>Eficiência</h3>
              </div>
              <div className="card-valor">
                <h3>Confiabilidade</h3>
              </div>
              <div className="card-valor">
                <h3>Segurança</h3>
              </div>
              <div className="card-valor">
                <h3>Desempenho</h3>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* RODAPÉ */}
      <footer>
        <div className="container">
          <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: '800' }}>
            Trans<span style={{ color: 'var(--cor-laranja)' }}>Bus</span>
          </h2>
          <p>&copy; 2026 TransBus Gestão de Frota. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}