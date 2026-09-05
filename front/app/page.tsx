import Image from "next/image";
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
          --cor-grafite: #474747;
          --cor-grafite-claro: #646464 ;
          --cor-azul-aqua: #00B4D8;
          --cor-azul-aqua-escuro: #0096b4;
          --cor-laranja: #F77F00;
          --cor-laranja-hover: #d66d00;
          --cor-branco: #fafafa;
          --cor-fundo: #a0a0a0;
          
          --fonte-principal: 'Nexa', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: var(--fonte-principal);
          background-color: var(--cor-fundo);
          color: var(--cor-grafite);
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
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
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
          font-size: 24px;
          font-weight: 800;
          color: var(--cor-grafite);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo span {
          color: var(--cor-azul-aqua);
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
          transition: background-color 0.3s ease;
        }

        .btn-login:hover {
          background-color: var(--cor-laranja-hover);
        }

        /* =========================================
           HERO SECTION (Destaque Principal)
           ========================================= */
        .hero {
          background: linear-gradient(135deg, var(--cor-grafite) 0%, var(--cor-grafite-claro) 100%);
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
          color: var(--cor-azul-aqua);
        }

        .hero p {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto 40px auto;
          color: #8debfc;
        }

        /* =========================================
           SEÇÃO: NOSSA HISTÓRIA E FUTURO
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
          color: var(--cor-grafite);
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
          background-color: var(--cor-azul-aqua);
          border-radius: 2px;
        }

        .historia-texto p {
          margin-bottom: 16px;
          font-size: 1.1rem;
          color: #1d1d1d;
        }

        /* =========================================
           SEÇÃO: NOSSOS VALORES
           ========================================= */
        .valores {
          padding: 80px 0;
          background-color: var(--cor-fundo);
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
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          border-bottom: 4px solid var(--cor-azul-aqua);
          transition: transform 0.3s ease;
        }

        .card-valor:hover {
          transform: translateY(-5px);
        }

        .card-valor h3 {
          color: var(--cor-grafite);
          font-size: 1.25rem;
          margin-bottom: 8px;
        }

        /* =========================================
           RODAPÉ
           ========================================= */
        footer {
          background-color: var(--cor-grafite);
          color: var(--cor-branco);
          text-align: center;
          padding: 40px 0;
        }

        footer p {
          opacity: 0.7;
          font-size: 0.9rem;
        }
      `}} />

      {/* CABEÇALHO */}
      <header>
        <div className="container header-content">
          <a href="#" className="logo">
            Trans<span>Bus</span>
          </a>
          <a>
          <Link href="/login" className="btn-login">Login</Link>
          </a>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main>
        
        {/* HERO SECTION */}
        <section className="hero">
          <div className="container">
            <h1>Mais controle para sua <span>Frota de Ônibus</span></h1>
            <p>Centralize informações, gerencie motoristas e otimize rotas em uma única plataforma confiável e segura.</p>
            <a 
              href="#login" 
              className="btn-login" 
              style={{ padding: '16px 32px', fontSize: '1.1rem' }}
            >
              Acessar TransBus
            </a>
          </div>
        </section>

        {/* SEÇÃO NOSSA HISTÓRIA E OBJETIVO */}
        <section className="historia">
          <div className="container historia-grid">
            <div className="historia-texto">
              <h2 className="section-title">Como Nascemos</h2>
              <p>O TransBus nasceu da necessidade de criar uma forma mais organizada e eficiente de gerenciar uma frota de ônibus responsável pelo transporte de passageiros entre terminais e bairros.</p>
              <p>A ideia surgiu ao perceber que, para uma operação funcionar corretamente, é necessário controlar diversas informações, como a disponibilidade dos ônibus, a situação dos motoristas e a organização das viagens.</p>
            </div>
            <div className="historia-texto">
              <h2 className="section-title">Nossa Missão & Futuro</h2>
              <p>A principal motivação do sistema é centralizar essas informações em uma única plataforma, facilitando o gerenciamento da frota e auxiliando na organização das operações.</p>
              <p>No futuro, buscamos evoluir para uma solução cada vez mais completa. O objetivo final é entregar ao cliente mais controle sobre ônibus, motoristas e viagens, contribuindo para melhores decisões e uma operação mais eficiente.</p>
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
                <h3>Eficiência</h3>
              </div>
              <div className="card-valor">
                <h3>Organização</h3>
              </div>
              <div className="card-valor">
                <h3>Confiabilidade</h3>
              </div>
              <div className="card-valor">
                <h3>Segurança</h3>
              </div>
              <div className="card-valor">
                <h3>Evolução</h3>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* RODAPÉ */}
      <footer>
        <div className="container">
          <h2 style={{ marginBottom: '16px' }}>
            Trans<span style={{ color: 'var(--cor-azul-aqua)' }}>Bus</span>
          </h2>
          <p>&copy; 2026 TransBus Gestão de Frota. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
