# TransBus — Gestão de Frota e Linhas

Sistema web para empresas de transporte gerenciarem **veículos (ônibus e caminhões), motoristas e viagens**, com separação de dados por empresa, autenticação JWT e uma aplicação desktop (JavaFX) para inicializar o sistema do zero.

Projeto da **Avaliação Final**, desenvolvido por **Wilian Wagner dos Santos**.
 
---

## Tecnologias

| Parte | Tecnologias |
| --- | --- |
| Backend | Java 17, Spring Boot, Spring Security, JWT (Auth0 `java-jwt`), Spring Data JPA, PostgreSQL, Swagger (springdoc), Lombok |
| Frontend | Next.js (React + TypeScript), Redux Toolkit, Axios, Tailwind CSS |
| Desktop | JavaFX (bootstrapping: cria o primeiro usuário/empresa) |
| Integração externa | API ViaCEP (preenchimento de endereço pelo CEP) |

## Estrutura do repositório

```
TransBus/
├── src/main/java/com/example/transbus/   → Backend (Spring Boot)
│   ├── domain/          → Entidades, objetos de valor (CPF, Endereco), repositories e portas
│   ├── application/     → Services (regras de negócio) e DTOs (records Request/Response)
│   ├── infra/           → Segurança (JWT), Swagger, CORS e adaptador do ViaCEP
│   └── presentation/    → Controllers REST
├── front/               → Frontend (Next.js + Redux)
└── back/                → Aplicação Desktop (JavaFX)
```

## Arquitetura (DDD / Clean Code)

- **Apresentação (`presentation`)**: controllers recebem e devolvem **DTOs** e só chamam os services.
- **Aplicação (`application`)**: services com as regras de negócio e o filtro por empresa do usuário logado.
- **Domínio (`domain`)**: entidades, objetos de valor e interfaces (portas), como `IViaCepExternalRepository`.
- **Infraestrutura (`infra`)**: implementa as portas (adaptador do ViaCEP) e configura a segurança.
  A comunicação com o ViaCEP segue a **Inversão de Dependência**: o domínio define a porta, que devolve o objeto de valor `Endereco`, e a infraestrutura a implementa.

## Relacionamentos JPA

| Relação | Tipo |
| --- | --- |
| Empresa → Usuários | `@OneToMany` |
| Usuário, Veículo, Motorista, Viagem → Empresa | `@ManyToOne` |
| Viagem → Motorista / Viagem → Veículo | `@ManyToOne` |
| Usuário → CPF / Motorista → Endereço | `@Embedded` (objetos de valor) |

## Perfis de usuário

| Perfil | Como é no sistema | O que pode fazer |
| --- | --- | --- |
| **Global** (dono do sistema) | `ROLE_ADMIN` sem empresa | Consulta os dados de todas as empresas (não cadastra) |
| **Administrador** da empresa | `ROLE_ADMIN` com empresa | Usa o sistema e gerencia os usuários da empresa |
| **Funcionário** | `ROLE_USER` com empresa | Usa veículos, motoristas e viagens (sem acesso a usuários) |

Todas as consultas são filtradas pela empresa do usuário logado. Acesso a um registro de outra empresa responde **404**.

## Regras de negócio

- Um **motorista** (e um **veículo**) não pode estar em duas viagens ativas no mesmo período de tempo.
- Quando um veículo é marcado como **AVARIADO**, as próximas viagens agendadas para ele são **desvinculadas** (ficam "aguardando veículo"), e a viagem em andamento passa para **COM_PROBLEMA**.
- Ao iniciar uma viagem, o motorista fica `DIRIGINDO` e o veículo `EM_SERVICO`; ao concluir ou cancelar, os dois voltam a ficar disponíveis.
---

## Como rodar

### Pré-requisitos

- Java 17+ e Maven (ou o `mvnw` do projeto)
- Node.js 20+
- PostgreSQL com um banco chamado **`TransBus`**
### 1. Backend (porta 8080)

Confira em `src/main/resources/application.properties` o usuário e a senha do PostgreSQL e rode a classe `TransBusApplication`, ou:

```bash
./mvnw spring-boot:run
```

As tabelas são criadas automaticamente (`spring.jpa.hibernate.ddl-auto=update`).

Swagger: **http://localhost:8080/swagger-ui/index.html**

### 2. Desktop JavaFX (primeiro acesso)

```bash
cd back
./mvnw javafx:run
```

1. Entre com a chave definida no `LoginController.java`.
2. Abra o cadastro e crie o **usuário Global** (marcando a opção) ou uma **Empresa + Administrador**.
   A `SECRET_KEY` do `UsuarioController.java` (JavaFX) precisa ser igual ao `spring.secret` do backend.

### 3. Frontend (porta 3000)

```bash
cd front
npm install
npm run dev
```

Acesse **http://localhost:3000** e faça login com o usuário criado pelo JavaFX.
 
---

## Segurança

- `POST /auth/login` devolve um **token JWT**; todos os endpoints de negócio exigem `Authorization: Bearer <token>`.
- `POST /usuarios/admin` é o único endpoint de negócio público (bootstrapping), protegido pela `secretKey`.
- `/usuarios/**` exige perfil **ADMIN**.
- Os tokens válidos ficam na tabela `token`, que é limpa quando o backend inicia: reiniciar o backend invalida todos os tokens.
## Frontend: Redux e Axios

- **`authSlice`**: guarda o token e o usuário **somente na store** do Redux (sem cookie ou localStorage).
- **`veiculoSlice`**: guarda a lista de veículos e o filtro de status, compartilhados entre a tela de Veículos e a Home.
- **`services/api.ts`**:
    - interceptor de **requisição**: injeta o token da store em todas as chamadas;
    - interceptor de **resposta**: ao receber **401**, despacha `logout()` e a aplicação volta para a tela de login.
## Endpoints principais

| Recurso | Endpoints |
| --- | --- |
| Autenticação | `POST /auth/login` |
| Usuários | `GET/POST /usuarios`, `POST /usuarios/admin`, `GET/PUT /usuarios/{id}`, `PATCH /usuarios/{id}/status`, `DELETE /usuarios/{id}/excluir`, `GET /usuarios/buscarusuariologado` |
| Veículos | `GET/POST /veiculos`, `GET/PUT /veiculos/{id}`, `PATCH /veiculos/{id}/status`, `DELETE /veiculos/{id}/excluir` |
| Motoristas | `GET/POST /motoristas`, `GET/PUT /motoristas/{id}`, `PATCH /motoristas/{id}/status`, `DELETE /motoristas/{id}/excluir` |
| Viagens | `GET/POST /viagens`, `GET/PUT /viagens/{id}`, `PATCH /viagens/{id}/status`, `DELETE /viagens/{id}/cancelar` |
| Endereço (ViaCEP) | `GET /endereco/{cep}` |